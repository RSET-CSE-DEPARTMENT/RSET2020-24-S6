import json

def sort_by_category(data):
    custom_order = [
        "Smartphones", "Cameras", "Computers", "Men'sFashion", "Women'sFashion",
        "Headphones", "Furniture", "Books", "Fragrances", "Grocery",
        "SkinCare", "Watches", "Shoes", "Kitchenware", "Chocolates", "Jewellery"
    ]

    # Sort the data based on the custom order of categories
    sorted_data = sorted(data, key=lambda item: custom_order.index(item.get("category", "")))

    return sorted_data

def main():
    input_file = "product-data.json"
    output_file = "input.json"

    try:
        # Read data from the input file
        with open(input_file, "r") as file:
            data = json.load(file)

        # Sort the data by category
        sorted_data = sort_by_category(data)

        # Save the sorted data back to the output file
        with open(output_file, "w") as file:
            json.dump(sorted_data, file, indent=2)

        print("Data sorted and saved successfully.")
    except FileNotFoundError:
        print(f"Error: File '{input_file}' not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
