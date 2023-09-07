using UnrealBuildTool;

public class GeneratedWorldGenerators : ModuleRules
{
	public GeneratedWorldGenerators(ReadOnlyTargetRules Target) : base(Target)
	{
		PCHUsage = PCHUsageMode.UseExplicitOrSharedPCHs;
		PublicDependencyModuleNames.AddRange(new string[] { "Core", "CoreUObject", "Engine", "InputCore", "Voxel", "VoxelGraph" });
        PrivatePCHHeaderFile = "GeneratedWorldGeneratorsPCH.h";
	}
}
