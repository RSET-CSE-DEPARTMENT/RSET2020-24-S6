import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_recommenders as tfrs

from typing import Dict, Text
import pprintpp

import numpy as np
import pandas as pd

interaction_data = pd.read_csv(r"RAW_interactions.csv")
recipe_data = pd.read_csv(r"RAW_recipes.csv")

interaction_train = pd.read_csv(r"interactions_train.csv")

uniqueUserIds = interaction_data.user_id.unique()
uniqueFoodIds = interaction_data.recipe_id.unique()

class RankingModel(tf.keras.Model):

    def __init__(self):
        super().__init__()
        embedding_dimension = 32

        self.user_embeddings = tf.keras.Sequential([
                                    tf.keras.layers.experimental.preprocessing.StringLookup(
                                        vocabulary=uniqueUserIds, mask_token=None),
                                        # add addional embedding to account for unknow tokens
                                    tf.keras.layers.Embedding(len(uniqueUserIds)+1, embedding_dimension)
                                    ])

        self.product_embeddings = tf.keras.Sequential([
                                    tf.keras.layers.experimental.preprocessing.StringLookup(
                                        vocabulary=uniqueFoodIds, mask_token=None),
                                    # add addional embedding to account for unknow tokens
                                    tf.keras.layers.Embedding(len(uniqueFoodIds)+1, embedding_dimension)
                                    ])
        # Set up a retrieval task and evaluation metrics over the
        # entire dataset of candidates.
        self.ratings = tf.keras.Sequential([
                            tf.keras.layers.Dense(256, activation="relu"),
                            tf.keras.layers.Dense(64,  activation="relu"),
                            tf.keras.layers.Dense(1)
                              ])

    def call(self, userId, foodId):
        user_embeddings  = self.user_embeddings (userId)
        food_embeddings = self.product_embeddings(foodId)
        return self.ratings(tf.concat([user_embeddings, food_embeddings], axis=1))
    
class FoodModel(tfrs.models.Model):

    def __init__(self):
        super().__init__()
        self.ranking_model: tf.keras.Model = RankingModel()
        self.task: tf.keras.layers.Layer   = tfrs.tasks.Ranking(
                                                    loss    =  tf.keras.losses.MeanSquaredError(),
                                                    metrics = [tf.keras.metrics.RootMeanSquaredError()])


    def compute_loss(self, features, training=False):
        rating_predictions = self.ranking_model(features["userID"], features["foodID"]  )

        return self.task( labels=features["rating"], predictions=rating_predictions)