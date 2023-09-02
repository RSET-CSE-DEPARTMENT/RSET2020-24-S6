import * as dotenv from 'dotenv';
import * as uuid from 'uuid';
import * as pb from 'pb-util';
import { SessionsClient } from '@google-cloud/dialogflow';

dotenv.config();

export class Dialogflow {
  private projectId: string;
  private languageCode: string;
  private request: any;
  private sessionClient: any;
  private sessionPath: any;
  private sessionId: string;

  constructor() {
    this.languageCode = process.env.LANGUAGE_CODE || '';
    this.projectId = process.env.PROJECT_ID || '';
    this.setupDialogflow();
  }

  public setupDialogflow() {
    this.sessionId = uuid.v4();
    this.sessionClient = new SessionsClient();
    this.sessionPath = this.sessionClient.projectAgentSessionPath(
      this.projectId,
      this.sessionId
    );

    this.request = {
      session: this.sessionPath,
      queryInput: {
        text: {
          languageCode: this.languageCode
        }
      }
    };
  }

  public async detectIntent(text: string) {
    this.request.queryInput.text.text = text;
    const [response] = await this.sessionClient.detectIntent(this.request);
    return this.getHandleResponses(response.queryResult);
  }

  public getHandleResponses(result: any): any {
    const INTENT_NAME = result.intent.displayName;
    const PARAMETERS = JSON.stringify(pb.struct.decode(result.parameters));
    const FULFILLMENT_TEXT = result.fulfillmentText;
    let PAYLOAD = '';
    if (
      result.fulfillmentMessages &&
      result.fulfillmentMessages.length > 0 &&
      result.fulfillmentMessages[0].payload
    ) {
      PAYLOAD = JSON.stringify(
        pb.struct.decode(result.fulfillmentMessages[0].payload)
      );
    }
    const json: DF_RESULT = {
      INTENT_NAME,
      FULFILLMENT_TEXT,
      PARAMETERS,
      PAYLOAD
    };
    return json;
  }
}

interface DF_RESULT {
  INTENT_NAME?: string;
  FULFILLMENT_TEXT?: string;
  PARAMETERS?: any;
  PAYLOAD?: any;
}

export const dialogflow = new Dialogflow();
