import json

def add_index_to_data(data):
    for i, item in enumerate(data, 1):
        item["index"] = i
    return data

def main():
    input_file = "input.json"
    output_file = "output.json"

    try:
        # Read data from the input file
        with open(input_file, "r") as file:
            data = json.load(file)

        # Modify data by adding the "index" key
        modified_data = add_index_to_data(data)

        # Save the modified data back to the output file
        with open(output_file, "w") as file:
            json.dump(modified_data, file, indent=2)

        print("File successfully processed.")
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
