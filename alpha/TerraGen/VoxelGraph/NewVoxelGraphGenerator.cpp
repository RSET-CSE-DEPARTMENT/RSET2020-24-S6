// Copyright 2021 Phyronnaz

#include "NewVoxelGraphGenerator.h"

PRAGMA_GENERATED_VOXEL_GRAPH_START

using FVoxelGraphSeed = int32;

#if VOXEL_GRAPH_GENERATED_VERSION == 1
class FNewVoxelGraphGeneratorInstance : public TVoxelGraphGeneratorInstanceHelper<FNewVoxelGraphGeneratorInstance, UNewVoxelGraphGenerator>
{
public:
	struct FParams
	{
		const float Frequency;
		const float Multiplier;
	};
	
	class FLocalComputeStruct_LocalValue
	{
	public:
		struct FOutputs
		{
			FOutputs() {}
			
			void Init(const FVoxelGraphOutputsInit& Init)
			{
			}
			
			template<typename T, uint32 Index>
			T Get() const;
			template<typename T, uint32 Index>
			void Set(T Value);
			
			v_flt Value;
		};
		struct FBufferConstant
		{
			FBufferConstant() {}
			
			v_flt Variable_4; // Multiplier = 300.0 output 0
			v_flt Variable_3; // Frequency = 0.00085 output 0
		};
		
		struct FBufferX
		{
			FBufferX() {}
			
			v_flt Variable_0; // X output 0
		};
		
		struct FBufferXY
		{
			FBufferXY() {}
			
			v_flt Variable_10; // * output 0
		};
		
		FLocalComputeStruct_LocalValue(const FParams& InParams)
			: Params(InParams)
		{
		}
		
		void Init(const FVoxelGeneratorInit& InitStruct)
		{
			////////////////////////////////////////////////////
			//////////////////// Init nodes ////////////////////
			////////////////////////////////////////////////////
			{
				////////////////////////////////////////////////////
				/////////////// Constant nodes init ////////////////
				////////////////////////////////////////////////////
				{
					/////////////////////////////////////////////////////////////////////////////////
					//////// First compute all seeds in case they are used by constant nodes ////////
					/////////////////////////////////////////////////////////////////////////////////
					
					
					////////////////////////////////////////////////////
					///////////// Then init constant nodes /////////////
					////////////////////////////////////////////////////
					
				}
				
				////////////////////////////////////////////////////
				//////////////////// Other inits ///////////////////
				////////////////////////////////////////////////////
				Function0_XYZWithoutCache_Init(InitStruct);
			}
			
			////////////////////////////////////////////////////
			//////////////// Compute constants /////////////////
			////////////////////////////////////////////////////
			{
				// Multiplier = 300.0
				BufferConstant.Variable_4 = Params.Multiplier;
				
				// Frequency = 0.00085
				BufferConstant.Variable_3 = Params.Frequency;
				
			}
		}
		void ComputeX(const FVoxelContext& Context, FBufferX& BufferX) const
		{
			Function0_X_Compute(Context, BufferX);
		}
		void ComputeXYWithCache(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			Function0_XYWithCache_Compute(Context, BufferX, BufferXY);
		}
		void ComputeXYWithoutCache(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			Function0_XYWithoutCache_Compute(Context, BufferX, BufferXY);
		}
		void ComputeXYZWithCache(const FVoxelContext& Context, const FBufferX& BufferX, const FBufferXY& BufferXY, FOutputs& Outputs) const
		{
			Function0_XYZWithCache_Compute(Context, BufferX, BufferXY, Outputs);
		}
		void ComputeXYZWithoutCache(const FVoxelContext& Context, FOutputs& Outputs) const
		{
			Function0_XYZWithoutCache_Compute(Context, Outputs);
		}
		
		inline FBufferX GetBufferX() const { return {}; }
		inline FBufferXY GetBufferXY() const { return {}; }
		inline FOutputs GetOutputs() const { return {}; }
		
	private:
		FBufferConstant BufferConstant;
		
		const FParams& Params;
		
		FVoxelFastNoise _2D_IQ_Noise_0_Noise;
		TStaticArray<uint8, 32> _2D_IQ_Noise_0_LODToOctaves;
		
		///////////////////////////////////////////////////////////////////////
		//////////////////////////// Init functions ///////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_XYZWithoutCache_Init(const FVoxelGeneratorInit& InitStruct)
		{
			// Init of 2D IQ Noise
			_2D_IQ_Noise_0_Noise.SetSeed(FVoxelGraphSeed(3000));
			_2D_IQ_Noise_0_Noise.SetInterpolation(EVoxelNoiseInterpolation::Hermite);
			_2D_IQ_Noise_0_Noise.SetFractalOctavesAndGain(15, 0.5);
			_2D_IQ_Noise_0_Noise.SetFractalLacunarity(2.0);
			_2D_IQ_Noise_0_Noise.SetFractalType(EVoxelNoiseFractalType::FBM);
			_2D_IQ_Noise_0_Noise.SetMatrixFromRotation_2D(40.0);
			_2D_IQ_Noise_0_LODToOctaves[0] = 15;
			_2D_IQ_Noise_0_LODToOctaves[1] = 15;
			_2D_IQ_Noise_0_LODToOctaves[2] = 15;
			_2D_IQ_Noise_0_LODToOctaves[3] = 15;
			_2D_IQ_Noise_0_LODToOctaves[4] = 15;
			_2D_IQ_Noise_0_LODToOctaves[5] = 15;
			_2D_IQ_Noise_0_LODToOctaves[6] = 15;
			_2D_IQ_Noise_0_LODToOctaves[7] = 15;
			_2D_IQ_Noise_0_LODToOctaves[8] = 15;
			_2D_IQ_Noise_0_LODToOctaves[9] = 15;
			_2D_IQ_Noise_0_LODToOctaves[10] = 15;
			_2D_IQ_Noise_0_LODToOctaves[11] = 15;
			_2D_IQ_Noise_0_LODToOctaves[12] = 15;
			_2D_IQ_Noise_0_LODToOctaves[13] = 15;
			_2D_IQ_Noise_0_LODToOctaves[14] = 15;
			_2D_IQ_Noise_0_LODToOctaves[15] = 15;
			_2D_IQ_Noise_0_LODToOctaves[16] = 15;
			_2D_IQ_Noise_0_LODToOctaves[17] = 15;
			_2D_IQ_Noise_0_LODToOctaves[18] = 15;
			_2D_IQ_Noise_0_LODToOctaves[19] = 15;
			_2D_IQ_Noise_0_LODToOctaves[20] = 15;
			_2D_IQ_Noise_0_LODToOctaves[21] = 15;
			_2D_IQ_Noise_0_LODToOctaves[22] = 15;
			_2D_IQ_Noise_0_LODToOctaves[23] = 15;
			_2D_IQ_Noise_0_LODToOctaves[24] = 15;
			_2D_IQ_Noise_0_LODToOctaves[25] = 15;
			_2D_IQ_Noise_0_LODToOctaves[26] = 15;
			_2D_IQ_Noise_0_LODToOctaves[27] = 15;
			_2D_IQ_Noise_0_LODToOctaves[28] = 15;
			_2D_IQ_Noise_0_LODToOctaves[29] = 15;
			_2D_IQ_Noise_0_LODToOctaves[30] = 15;
			_2D_IQ_Noise_0_LODToOctaves[31] = 15;
			
		}
		
		///////////////////////////////////////////////////////////////////////
		////////////////////////// Compute functions //////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_X_Compute(const FVoxelContext& Context, FBufferX& BufferX) const
		{
			// X
			BufferX.Variable_0 = Context.GetLocalX();
			
		}
		
		void Function0_XYWithCache_Compute(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			// Y
			v_flt Variable_1; // Y output 0
			Variable_1 = Context.GetLocalY();
			
			// 2D IQ Noise
			v_flt Variable_5; // 2D IQ Noise output 0
			v_flt Variable_6; // 2D IQ Noise output 1
			v_flt Variable_7; // 2D IQ Noise output 2
			Variable_5 = _2D_IQ_Noise_0_Noise.IQNoise_2D_Deriv(BufferX.Variable_0, Variable_1, BufferConstant.Variable_3, _2D_IQ_Noise_0_LODToOctaves[FMath::Clamp(Context.LOD, 0, 31)],Variable_6,Variable_7);
			Variable_5 = FMath::Clamp<v_flt>(Variable_5, -0.893718, 0.891721);
			Variable_6 = FMath::Clamp<v_flt>(Variable_6, -1.674910, 1.711161);
			Variable_7 = FMath::Clamp<v_flt>(Variable_7, -1.646701, 1.742905);
			
			// Get Slope from Derivatives.ATAN
			v_flt Variable_15; // Get Slope from Derivatives.ATAN output 0
			Variable_15 = FVoxelNodeFunctions::Atan(Variable_7);
			
			// Get Slope from Derivatives.ATAN
			v_flt Variable_13; // Get Slope from Derivatives.ATAN output 0
			Variable_13 = FVoxelNodeFunctions::Atan(Variable_6);
			
			// Get Slope from Derivatives.ABS
			v_flt Variable_14; // Get Slope from Derivatives.ABS output 0
			Variable_14 = FVoxelNodeFunctions::Abs(Variable_15);
			
			// Get Slope from Derivatives.ABS
			v_flt Variable_12; // Get Slope from Derivatives.ABS output 0
			Variable_12 = FVoxelNodeFunctions::Abs(Variable_13);
			
			// Get Slope from Derivatives.Max (float)
			v_flt Variable_16; // Get Slope from Derivatives.Max (float) output 0
			Variable_16 = FVoxelNodeFunctions::Max<v_flt>(Variable_12, FVoxelNodeFunctions::Max<v_flt>(Variable_14, v_flt(0.0f)));
			
			// Get Slope from Derivatives./
			v_flt Variable_11; // Get Slope from Derivatives./ output 0
			Variable_11 = Variable_16 / v_flt(3.14f);
			
			// -
			v_flt Variable_8; // - output 0
			Variable_8 = Variable_5 - Variable_11;
			
			// *
			BufferXY.Variable_10 = Variable_8 * BufferConstant.Variable_4;
			
		}
		
		void Function0_XYWithoutCache_Compute(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			// Y
			v_flt Variable_1; // Y output 0
			Variable_1 = Context.GetLocalY();
			
			// X
			BufferX.Variable_0 = Context.GetLocalX();
			
			// 2D IQ Noise
			v_flt Variable_5; // 2D IQ Noise output 0
			v_flt Variable_6; // 2D IQ Noise output 1
			v_flt Variable_7; // 2D IQ Noise output 2
			Variable_5 = _2D_IQ_Noise_0_Noise.IQNoise_2D_Deriv(BufferX.Variable_0, Variable_1, BufferConstant.Variable_3, _2D_IQ_Noise_0_LODToOctaves[FMath::Clamp(Context.LOD, 0, 31)],Variable_6,Variable_7);
			Variable_5 = FMath::Clamp<v_flt>(Variable_5, -0.893718, 0.891721);
			Variable_6 = FMath::Clamp<v_flt>(Variable_6, -1.674910, 1.711161);
			Variable_7 = FMath::Clamp<v_flt>(Variable_7, -1.646701, 1.742905);
			
			// Get Slope from Derivatives.ATAN
			v_flt Variable_15; // Get Slope from Derivatives.ATAN output 0
			Variable_15 = FVoxelNodeFunctions::Atan(Variable_7);
			
			// Get Slope from Derivatives.ATAN
			v_flt Variable_13; // Get Slope from Derivatives.ATAN output 0
			Variable_13 = FVoxelNodeFunctions::Atan(Variable_6);
			
			// Get Slope from Derivatives.ABS
			v_flt Variable_14; // Get Slope from Derivatives.ABS output 0
			Variable_14 = FVoxelNodeFunctions::Abs(Variable_15);
			
			// Get Slope from Derivatives.ABS
			v_flt Variable_12; // Get Slope from Derivatives.ABS output 0
			Variable_12 = FVoxelNodeFunctions::Abs(Variable_13);
			
			// Get Slope from Derivatives.Max (float)
			v_flt Variable_16; // Get Slope from Derivatives.Max (float) output 0
			Variable_16 = FVoxelNodeFunctions::Max<v_flt>(Variable_12, FVoxelNodeFunctions::Max<v_flt>(Variable_14, v_flt(0.0f)));
			
			// Get Slope from Derivatives./
			v_flt Variable_11; // Get Slope from Derivatives./ output 0
			Variable_11 = Variable_16 / v_flt(3.14f);
			
			// -
			v_flt Variable_8; // - output 0
			Variable_8 = Variable_5 - Variable_11;
			
			// *
			BufferXY.Variable_10 = Variable_8 * BufferConstant.Variable_4;
			
		}
		
		void Function0_XYZWithCache_Compute(const FVoxelContext& Context, const FBufferX& BufferX, const FBufferXY& BufferXY, FOutputs& Outputs) const
		{
			// Z
			v_flt Variable_2; // Z output 0
			Variable_2 = Context.GetLocalZ();
			
			// -
			v_flt Variable_9; // - output 0
			Variable_9 = Variable_2 - BufferXY.Variable_10;
			
			Outputs.Value = Variable_9;
		}
		
		void Function0_XYZWithoutCache_Compute(const FVoxelContext& Context, FOutputs& Outputs) const
		{
			// Y
			v_flt Variable_1; // Y output 0
			Variable_1 = Context.GetLocalY();
			
			// Z
			v_flt Variable_2; // Z output 0
			Variable_2 = Context.GetLocalZ();
			
			// X
			v_flt Variable_0; // X output 0
			Variable_0 = Context.GetLocalX();
			
			// 2D IQ Noise
			v_flt Variable_5; // 2D IQ Noise output 0
			v_flt Variable_6; // 2D IQ Noise output 1
			v_flt Variable_7; // 2D IQ Noise output 2
			Variable_5 = _2D_IQ_Noise_0_Noise.IQNoise_2D_Deriv(Variable_0, Variable_1, BufferConstant.Variable_3, _2D_IQ_Noise_0_LODToOctaves[FMath::Clamp(Context.LOD, 0, 31)],Variable_6,Variable_7);
			Variable_5 = FMath::Clamp<v_flt>(Variable_5, -0.893718, 0.891721);
			Variable_6 = FMath::Clamp<v_flt>(Variable_6, -1.674910, 1.711161);
			Variable_7 = FMath::Clamp<v_flt>(Variable_7, -1.646701, 1.742905);
			
			// Get Slope from Derivatives.ATAN
			v_flt Variable_15; // Get Slope from Derivatives.ATAN output 0
			Variable_15 = FVoxelNodeFunctions::Atan(Variable_7);
			
			// Get Slope from Derivatives.ATAN
			v_flt Variable_13; // Get Slope from Derivatives.ATAN output 0
			Variable_13 = FVoxelNodeFunctions::Atan(Variable_6);
			
			// Get Slope from Derivatives.ABS
			v_flt Variable_14; // Get Slope from Derivatives.ABS output 0
			Variable_14 = FVoxelNodeFunctions::Abs(Variable_15);
			
			// Get Slope from Derivatives.ABS
			v_flt Variable_12; // Get Slope from Derivatives.ABS output 0
			Variable_12 = FVoxelNodeFunctions::Abs(Variable_13);
			
			// Get Slope from Derivatives.Max (float)
			v_flt Variable_16; // Get Slope from Derivatives.Max (float) output 0
			Variable_16 = FVoxelNodeFunctions::Max<v_flt>(Variable_12, FVoxelNodeFunctions::Max<v_flt>(Variable_14, v_flt(0.0f)));
			
			// Get Slope from Derivatives./
			v_flt Variable_11; // Get Slope from Derivatives./ output 0
			Variable_11 = Variable_16 / v_flt(3.14f);
			
			// -
			v_flt Variable_8; // - output 0
			Variable_8 = Variable_5 - Variable_11;
			
			// *
			v_flt Variable_10; // * output 0
			Variable_10 = Variable_8 * BufferConstant.Variable_4;
			
			// -
			v_flt Variable_9; // - output 0
			Variable_9 = Variable_2 - Variable_10;
			
			Outputs.Value = Variable_9;
		}
		
	};
	class FLocalComputeStruct_LocalMaterial
	{
	public:
		struct FOutputs
		{
			FOutputs() {}
			
			void Init(const FVoxelGraphOutputsInit& Init)
			{
				MaterialBuilder.SetMaterialConfig(Init.MaterialConfig);
			}
			
			template<typename T, uint32 Index>
			T Get() const;
			template<typename T, uint32 Index>
			void Set(T Value);
			
			FVoxelMaterialBuilder MaterialBuilder;
		};
		struct FBufferConstant
		{
			FBufferConstant() {}
			
		};
		
		struct FBufferX
		{
			FBufferX() {}
			
		};
		
		struct FBufferXY
		{
			FBufferXY() {}
			
		};
		
		FLocalComputeStruct_LocalMaterial(const FParams& InParams)
			: Params(InParams)
		{
		}
		
		void Init(const FVoxelGeneratorInit& InitStruct)
		{
			////////////////////////////////////////////////////
			//////////////////// Init nodes ////////////////////
			////////////////////////////////////////////////////
			{
				////////////////////////////////////////////////////
				/////////////// Constant nodes init ////////////////
				////////////////////////////////////////////////////
				{
					/////////////////////////////////////////////////////////////////////////////////
					//////// First compute all seeds in case they are used by constant nodes ////////
					/////////////////////////////////////////////////////////////////////////////////
					
					
					////////////////////////////////////////////////////
					///////////// Then init constant nodes /////////////
					////////////////////////////////////////////////////
					
				}
				
				////////////////////////////////////////////////////
				//////////////////// Other inits ///////////////////
				////////////////////////////////////////////////////
				Function0_XYZWithoutCache_Init(InitStruct);
			}
			
			////////////////////////////////////////////////////
			//////////////// Compute constants /////////////////
			////////////////////////////////////////////////////
			{
			}
		}
		void ComputeX(const FVoxelContext& Context, FBufferX& BufferX) const
		{
			Function0_X_Compute(Context, BufferX);
		}
		void ComputeXYWithCache(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			Function0_XYWithCache_Compute(Context, BufferX, BufferXY);
		}
		void ComputeXYWithoutCache(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			Function0_XYWithoutCache_Compute(Context, BufferX, BufferXY);
		}
		void ComputeXYZWithCache(const FVoxelContext& Context, const FBufferX& BufferX, const FBufferXY& BufferXY, FOutputs& Outputs) const
		{
			Function0_XYZWithCache_Compute(Context, BufferX, BufferXY, Outputs);
		}
		void ComputeXYZWithoutCache(const FVoxelContext& Context, FOutputs& Outputs) const
		{
			Function0_XYZWithoutCache_Compute(Context, Outputs);
		}
		
		inline FBufferX GetBufferX() const { return {}; }
		inline FBufferXY GetBufferXY() const { return {}; }
		inline FOutputs GetOutputs() const { return {}; }
		
	private:
		FBufferConstant BufferConstant;
		
		const FParams& Params;
		
		
		///////////////////////////////////////////////////////////////////////
		//////////////////////////// Init functions ///////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_XYZWithoutCache_Init(const FVoxelGeneratorInit& InitStruct)
		{
		}
		
		///////////////////////////////////////////////////////////////////////
		////////////////////////// Compute functions //////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_X_Compute(const FVoxelContext& Context, FBufferX& BufferX) const
		{
		}
		
		void Function0_XYWithCache_Compute(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
		}
		
		void Function0_XYWithoutCache_Compute(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
		}
		
		void Function0_XYZWithCache_Compute(const FVoxelContext& Context, const FBufferX& BufferX, const FBufferXY& BufferXY, FOutputs& Outputs) const
		{
		}
		
		void Function0_XYZWithoutCache_Compute(const FVoxelContext& Context, FOutputs& Outputs) const
		{
		}
		
	};
	class FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ
	{
	public:
		struct FOutputs
		{
			FOutputs() {}
			
			void Init(const FVoxelGraphOutputsInit& Init)
			{
			}
			
			template<typename T, uint32 Index>
			T Get() const;
			template<typename T, uint32 Index>
			void Set(T Value);
			
			v_flt UpVectorX;
			v_flt UpVectorY;
			v_flt UpVectorZ;
		};
		struct FBufferConstant
		{
			FBufferConstant() {}
			
		};
		
		struct FBufferX
		{
			FBufferX() {}
			
		};
		
		struct FBufferXY
		{
			FBufferXY() {}
			
		};
		
		FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ(const FParams& InParams)
			: Params(InParams)
		{
		}
		
		void Init(const FVoxelGeneratorInit& InitStruct)
		{
			////////////////////////////////////////////////////
			//////////////////// Init nodes ////////////////////
			////////////////////////////////////////////////////
			{
				////////////////////////////////////////////////////
				/////////////// Constant nodes init ////////////////
				////////////////////////////////////////////////////
				{
					/////////////////////////////////////////////////////////////////////////////////
					//////// First compute all seeds in case they are used by constant nodes ////////
					/////////////////////////////////////////////////////////////////////////////////
					
					
					////////////////////////////////////////////////////
					///////////// Then init constant nodes /////////////
					////////////////////////////////////////////////////
					
				}
				
				////////////////////////////////////////////////////
				//////////////////// Other inits ///////////////////
				////////////////////////////////////////////////////
				Function0_XYZWithoutCache_Init(InitStruct);
			}
			
			////////////////////////////////////////////////////
			//////////////// Compute constants /////////////////
			////////////////////////////////////////////////////
			{
			}
		}
		void ComputeX(const FVoxelContext& Context, FBufferX& BufferX) const
		{
			Function0_X_Compute(Context, BufferX);
		}
		void ComputeXYWithCache(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			Function0_XYWithCache_Compute(Context, BufferX, BufferXY);
		}
		void ComputeXYWithoutCache(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
			Function0_XYWithoutCache_Compute(Context, BufferX, BufferXY);
		}
		void ComputeXYZWithCache(const FVoxelContext& Context, const FBufferX& BufferX, const FBufferXY& BufferXY, FOutputs& Outputs) const
		{
			Function0_XYZWithCache_Compute(Context, BufferX, BufferXY, Outputs);
		}
		void ComputeXYZWithoutCache(const FVoxelContext& Context, FOutputs& Outputs) const
		{
			Function0_XYZWithoutCache_Compute(Context, Outputs);
		}
		
		inline FBufferX GetBufferX() const { return {}; }
		inline FBufferXY GetBufferXY() const { return {}; }
		inline FOutputs GetOutputs() const { return {}; }
		
	private:
		FBufferConstant BufferConstant;
		
		const FParams& Params;
		
		
		///////////////////////////////////////////////////////////////////////
		//////////////////////////// Init functions ///////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_XYZWithoutCache_Init(const FVoxelGeneratorInit& InitStruct)
		{
		}
		
		///////////////////////////////////////////////////////////////////////
		////////////////////////// Compute functions //////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_X_Compute(const FVoxelContext& Context, FBufferX& BufferX) const
		{
		}
		
		void Function0_XYWithCache_Compute(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
		}
		
		void Function0_XYWithoutCache_Compute(const FVoxelContext& Context, FBufferX& BufferX, FBufferXY& BufferXY) const
		{
		}
		
		void Function0_XYZWithCache_Compute(const FVoxelContext& Context, const FBufferX& BufferX, const FBufferXY& BufferXY, FOutputs& Outputs) const
		{
		}
		
		void Function0_XYZWithoutCache_Compute(const FVoxelContext& Context, FOutputs& Outputs) const
		{
		}
		
	};
	class FLocalComputeStruct_LocalValueRangeAnalysis
	{
	public:
		struct FOutputs
		{
			FOutputs() {}
			
			void Init(const FVoxelGraphOutputsInit& Init)
			{
			}
			
			template<typename T, uint32 Index>
			TVoxelRange<T> Get() const;
			template<typename T, uint32 Index>
			void Set(TVoxelRange<T> Value);
			
			TVoxelRange<v_flt> Value;
		};
		struct FBufferConstant
		{
			FBufferConstant() {}
			
			TVoxelRange<v_flt> Variable_7; // * output 0
		};
		
		struct FBufferX
		{
			FBufferX() {}
			
		};
		
		struct FBufferXY
		{
			FBufferXY() {}
			
		};
		
		FLocalComputeStruct_LocalValueRangeAnalysis(const FParams& InParams)
			: Params(InParams)
		{
		}
		
		void Init(const FVoxelGeneratorInit& InitStruct)
		{
			////////////////////////////////////////////////////
			//////////////////// Init nodes ////////////////////
			////////////////////////////////////////////////////
			{
				////////////////////////////////////////////////////
				/////////////// Constant nodes init ////////////////
				////////////////////////////////////////////////////
				{
					/////////////////////////////////////////////////////////////////////////////////
					//////// First compute all seeds in case they are used by constant nodes ////////
					/////////////////////////////////////////////////////////////////////////////////
					
					
					////////////////////////////////////////////////////
					///////////// Then init constant nodes /////////////
					////////////////////////////////////////////////////
					
					// Init of 2D IQ Noise
					_2D_IQ_Noise_1_Noise.SetSeed(FVoxelGraphSeed(3000));
					_2D_IQ_Noise_1_Noise.SetInterpolation(EVoxelNoiseInterpolation::Hermite);
					_2D_IQ_Noise_1_Noise.SetFractalOctavesAndGain(15, 0.5);
					_2D_IQ_Noise_1_Noise.SetFractalLacunarity(2.0);
					_2D_IQ_Noise_1_Noise.SetFractalType(EVoxelNoiseFractalType::FBM);
					_2D_IQ_Noise_1_Noise.SetMatrixFromRotation_2D(40.0);
					_2D_IQ_Noise_1_LODToOctaves[0] = 15;
					_2D_IQ_Noise_1_LODToOctaves[1] = 15;
					_2D_IQ_Noise_1_LODToOctaves[2] = 15;
					_2D_IQ_Noise_1_LODToOctaves[3] = 15;
					_2D_IQ_Noise_1_LODToOctaves[4] = 15;
					_2D_IQ_Noise_1_LODToOctaves[5] = 15;
					_2D_IQ_Noise_1_LODToOctaves[6] = 15;
					_2D_IQ_Noise_1_LODToOctaves[7] = 15;
					_2D_IQ_Noise_1_LODToOctaves[8] = 15;
					_2D_IQ_Noise_1_LODToOctaves[9] = 15;
					_2D_IQ_Noise_1_LODToOctaves[10] = 15;
					_2D_IQ_Noise_1_LODToOctaves[11] = 15;
					_2D_IQ_Noise_1_LODToOctaves[12] = 15;
					_2D_IQ_Noise_1_LODToOctaves[13] = 15;
					_2D_IQ_Noise_1_LODToOctaves[14] = 15;
					_2D_IQ_Noise_1_LODToOctaves[15] = 15;
					_2D_IQ_Noise_1_LODToOctaves[16] = 15;
					_2D_IQ_Noise_1_LODToOctaves[17] = 15;
					_2D_IQ_Noise_1_LODToOctaves[18] = 15;
					_2D_IQ_Noise_1_LODToOctaves[19] = 15;
					_2D_IQ_Noise_1_LODToOctaves[20] = 15;
					_2D_IQ_Noise_1_LODToOctaves[21] = 15;
					_2D_IQ_Noise_1_LODToOctaves[22] = 15;
					_2D_IQ_Noise_1_LODToOctaves[23] = 15;
					_2D_IQ_Noise_1_LODToOctaves[24] = 15;
					_2D_IQ_Noise_1_LODToOctaves[25] = 15;
					_2D_IQ_Noise_1_LODToOctaves[26] = 15;
					_2D_IQ_Noise_1_LODToOctaves[27] = 15;
					_2D_IQ_Noise_1_LODToOctaves[28] = 15;
					_2D_IQ_Noise_1_LODToOctaves[29] = 15;
					_2D_IQ_Noise_1_LODToOctaves[30] = 15;
					_2D_IQ_Noise_1_LODToOctaves[31] = 15;
					
				}
				
				////////////////////////////////////////////////////
				//////////////////// Other inits ///////////////////
				////////////////////////////////////////////////////
				Function0_XYZWithoutCache_Init(InitStruct);
			}
			
			////////////////////////////////////////////////////
			//////////////// Compute constants /////////////////
			////////////////////////////////////////////////////
			{
				// 2D IQ Noise
				TVoxelRange<v_flt> Variable_2; // 2D IQ Noise output 0
				TVoxelRange<v_flt> Variable_3; // 2D IQ Noise output 1
				TVoxelRange<v_flt> Variable_4; // 2D IQ Noise output 2
				Variable_2 = { -0.893718f, 0.891721f };
				Variable_3 = { -1.674910f, 1.711161f };
				Variable_4 = { -1.646701f, 1.742905f };
				
				// Multiplier = 300.0
				TVoxelRange<v_flt> Variable_1; // Multiplier = 300.0 output 0
				Variable_1 = Params.Multiplier;
				
				// Get Slope from Derivatives.ATAN
				TVoxelRange<v_flt> Variable_10; // Get Slope from Derivatives.ATAN output 0
				Variable_10 = FVoxelNodeFunctions::Atan(Variable_3);
				
				// Get Slope from Derivatives.ATAN
				TVoxelRange<v_flt> Variable_12; // Get Slope from Derivatives.ATAN output 0
				Variable_12 = FVoxelNodeFunctions::Atan(Variable_4);
				
				// Get Slope from Derivatives.ABS
				TVoxelRange<v_flt> Variable_9; // Get Slope from Derivatives.ABS output 0
				Variable_9 = FVoxelNodeFunctions::Abs(Variable_10);
				
				// Get Slope from Derivatives.ABS
				TVoxelRange<v_flt> Variable_11; // Get Slope from Derivatives.ABS output 0
				Variable_11 = FVoxelNodeFunctions::Abs(Variable_12);
				
				// Get Slope from Derivatives.Max (float)
				TVoxelRange<v_flt> Variable_13; // Get Slope from Derivatives.Max (float) output 0
				Variable_13 = FVoxelNodeFunctions::Max<v_flt>(Variable_9, FVoxelNodeFunctions::Max<v_flt>(Variable_11, TVoxelRange<v_flt>(0.0f)));
				
				// Get Slope from Derivatives./
				TVoxelRange<v_flt> Variable_8; // Get Slope from Derivatives./ output 0
				Variable_8 = Variable_13 / TVoxelRange<v_flt>(3.14f);
				
				// -
				TVoxelRange<v_flt> Variable_5; // - output 0
				Variable_5 = Variable_2 - Variable_8;
				
				// *
				BufferConstant.Variable_7 = Variable_5 * Variable_1;
				
			}
		}
		void ComputeXYZWithoutCache(const FVoxelContextRange& Context, FOutputs& Outputs) const
		{
			Function0_XYZWithoutCache_Compute(Context, Outputs);
		}
		
		inline FBufferX GetBufferX() const { return {}; }
		inline FBufferXY GetBufferXY() const { return {}; }
		inline FOutputs GetOutputs() const { return {}; }
		
	private:
		FBufferConstant BufferConstant;
		
		const FParams& Params;
		
		FVoxelFastNoise _2D_IQ_Noise_1_Noise;
		TStaticArray<uint8, 32> _2D_IQ_Noise_1_LODToOctaves;
		
		///////////////////////////////////////////////////////////////////////
		//////////////////////////// Init functions ///////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_XYZWithoutCache_Init(const FVoxelGeneratorInit& InitStruct)
		{
		}
		
		///////////////////////////////////////////////////////////////////////
		////////////////////////// Compute functions //////////////////////////
		///////////////////////////////////////////////////////////////////////
		
		void Function0_XYZWithoutCache_Compute(const FVoxelContextRange& Context, FOutputs& Outputs) const
		{
			// Z
			TVoxelRange<v_flt> Variable_0; // Z output 0
			Variable_0 = Context.GetLocalZ();
			
			// -
			TVoxelRange<v_flt> Variable_6; // - output 0
			Variable_6 = Variable_0 - BufferConstant.Variable_7;
			
			Outputs.Value = Variable_6;
		}
		
	};
	
	FNewVoxelGraphGeneratorInstance(UNewVoxelGraphGenerator& Object)
			: TVoxelGraphGeneratorInstanceHelper(
			{
				{ "Value", 1 },
			},
			{
			},
			{
			},
			{
				{
					{ "Value", NoTransformAccessor<v_flt>::Get<1, TOutputFunctionPtr<v_flt>>() },
				},
				{
				},
				{
				},
				{
					{ "Value", NoTransformRangeAccessor<v_flt>::Get<1, TRangeOutputFunctionPtr<v_flt>>() },
				}
			},
			{
				{
					{ "Value", WithTransformAccessor<v_flt>::Get<1, TOutputFunctionPtr_Transform<v_flt>>() },
				},
				{
				},
				{
				},
				{
					{ "Value", WithTransformRangeAccessor<v_flt>::Get<1, TRangeOutputFunctionPtr_Transform<v_flt>>() },
				}
			},
			Object)
		, Params(FParams
		{
			Object.Frequency,
			Object.Multiplier
		})
		, LocalValue(Params)
		, LocalMaterial(Params)
		, LocalUpVectorXUpVectorYUpVectorZ(Params)
		, LocalValueRangeAnalysis(Params)
	{
	}
	
	virtual void InitGraph(const FVoxelGeneratorInit& InitStruct) override final
	{
		LocalValue.Init(InitStruct);
		LocalMaterial.Init(InitStruct);
		LocalUpVectorXUpVectorYUpVectorZ.Init(InitStruct);
		LocalValueRangeAnalysis.Init(InitStruct);
	}
	
	template<uint32... Permutation>
	auto& GetTarget() const;
	
	template<uint32... Permutation>
	auto& GetRangeTarget() const;
	
private:
	FParams Params;
	FLocalComputeStruct_LocalValue LocalValue;
	FLocalComputeStruct_LocalMaterial LocalMaterial;
	FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ LocalUpVectorXUpVectorYUpVectorZ;
	FLocalComputeStruct_LocalValueRangeAnalysis LocalValueRangeAnalysis;
	
};

template<>
inline v_flt FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalValue::FOutputs::Get<v_flt, 1>() const
{
	return Value;
}
template<>
inline void FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalValue::FOutputs::Set<v_flt, 1>(v_flt InValue)
{
	Value = InValue;
}
template<>
inline FVoxelMaterial FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalMaterial::FOutputs::Get<FVoxelMaterial, 2>() const
{
	return MaterialBuilder.Build();
}
template<>
inline void FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalMaterial::FOutputs::Set<FVoxelMaterial, 2>(FVoxelMaterial Material)
{
}
template<>
inline v_flt FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ::FOutputs::Get<v_flt, 3>() const
{
	return UpVectorX;
}
template<>
inline void FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ::FOutputs::Set<v_flt, 3>(v_flt InValue)
{
	UpVectorX = InValue;
}
template<>
inline v_flt FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ::FOutputs::Get<v_flt, 4>() const
{
	return UpVectorY;
}
template<>
inline void FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ::FOutputs::Set<v_flt, 4>(v_flt InValue)
{
	UpVectorY = InValue;
}
template<>
inline v_flt FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ::FOutputs::Get<v_flt, 5>() const
{
	return UpVectorZ;
}
template<>
inline void FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalUpVectorXUpVectorYUpVectorZ::FOutputs::Set<v_flt, 5>(v_flt InValue)
{
	UpVectorZ = InValue;
}
template<>
inline TVoxelRange<v_flt> FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalValueRangeAnalysis::FOutputs::Get<v_flt, 1>() const
{
	return Value;
}
template<>
inline void FNewVoxelGraphGeneratorInstance::FLocalComputeStruct_LocalValueRangeAnalysis::FOutputs::Set<v_flt, 1>(TVoxelRange<v_flt> InValue)
{
	Value = InValue;
}
template<>
inline auto& FNewVoxelGraphGeneratorInstance::GetTarget<1>() const
{
	return LocalValue;
}
template<>
inline auto& FNewVoxelGraphGeneratorInstance::GetTarget<2>() const
{
	return LocalMaterial;
}
template<>
inline auto& FNewVoxelGraphGeneratorInstance::GetRangeTarget<0, 1>() const
{
	return LocalValueRangeAnalysis;
}
template<>
inline auto& FNewVoxelGraphGeneratorInstance::GetTarget<3, 4, 5>() const
{
	return LocalUpVectorXUpVectorYUpVectorZ;
}
#endif

////////////////////////////////////////////////////////////
////////////////////////// UCLASS //////////////////////////
////////////////////////////////////////////////////////////

UNewVoxelGraphGenerator::UNewVoxelGraphGenerator()
{
	bEnableRangeAnalysis = true;
}

TVoxelSharedRef<FVoxelTransformableGeneratorInstance> UNewVoxelGraphGenerator::GetTransformableInstance()
{
#if VOXEL_GRAPH_GENERATED_VERSION == 1
	return MakeVoxelShared<FNewVoxelGraphGeneratorInstance>(*this);
#else
#if VOXEL_GRAPH_GENERATED_VERSION > 1
	EMIT_CUSTOM_WARNING("Outdated generated voxel graph: NewVoxelGraphGenerator. You need to regenerate it.");
	FVoxelMessages::Warning("Outdated generated voxel graph: NewVoxelGraphGenerator. You need to regenerate it.");
#else
	EMIT_CUSTOM_WARNING("Generated voxel graph is more recent than the Voxel Plugin version: NewVoxelGraphGenerator. You need to update the plugin.");
	FVoxelMessages::Warning("Generated voxel graph is more recent than the Voxel Plugin version: NewVoxelGraphGenerator. You need to update the plugin.");
#endif
	return MakeVoxelShared<FVoxelTransformableEmptyGeneratorInstance>();
#endif
}

PRAGMA_GENERATED_VOXEL_GRAPH_END
