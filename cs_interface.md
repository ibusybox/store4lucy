#product storage data struct
{
    "products" : [
        {
          "number" : "IP1-CS-001",
          "model" : "iPhone5", "name" : "iPhone5 metal case", 
          "description" : "iPhone5 metal case best selling.",
          "image" : "sample.jpg",
          "suppliers" : [
              {"supplier name" : "Changjida", "price" : "6 RMB"},
              {"supplier name" : "Niumowang", "price" : "7 RMB"}
          ]
        },
        {...}
    ]
}

#product related interface description
##1. /product/q/id/json interface description
###description
query product by ID
###request type
**get**
###input
**/?id=1**
###output
if admin user then output JSON data, same as the product storage, else output product storate withtou suppliers info.

##2. /product/q/id/html interface description
###description
This URL just redirect to /product/q/id/json
###request type
get
###input
/?id=1
###output
redirect to /product/q/id/json


##2. /product/q/id_list/json interface description
###description
Query product by specified a list of prudct id
###request type
**get**
###input
**?id_list=1,2**
###output
output JSON data, as an array of product.

##3. /product/q/id_list/html interface description
###description
The url just redirect to /product/q/id_list/json and append the url parameters.
###request type
get
###input
/?id_list=1,2,3
###output
redirect

##4. /product/q/compatible_brand interface description
###description
query brands of all product.
###request type
get
###input
N/A
###output
an array contains brand as string


#PI data struct storage style
{
    "pi_no" : "PI_20130403194523000",
    "product_id_list" : [1,2,3,4,5],
    "product_list" : [
        {"product_id" : 1, "color" : "Red", "amount" : 500, "price" : "5 RMB"},
        {"product_id" : 1, "color" : "Blue", "amount" : 300, "price" : "5 RMB"},
        {"product_id" : 2, "color" : "White", "amount" : 200, "price" : "7 RMB"},
        {"product_id" : 3, "color" : "White", "amount" : 200, "price" : "9 RMB"},
        {"product_id" : 4, "color" : "White", "amount" : 200, "price" : "10.5 RMB"},
        {"product_id" : 5, "color" : "White", "amount" : 200, "price" : "3.5 RMB"}
    ],
    "creator" : "Fendo",
    "customer_name" : "Syed",
    "order_belong_to" : "the order number",
    "state" : 0,
    "packing" : {
        "box_amount" : 2,
        "boxes" : [
            {"box_number" : 1, "box_content" : [
                {"product_id" : 1, "color" : "Red", "amount" : 250},
                {"product_id" : 1, "color" : "Red", "amount" : 250}
            ] },
            {"box_number" : 2, "box_content" : [
                {"product_id" : 1, "color" : "Blue", "amount" : 300},
                {"product_id" : 2, "color" : "White", "amount" : 200},
                {"product_id" : 3, "color" : "White", "amount" : 200},
                {"product_id" : 4, "color" : "White", "amount" : 200},
                {"product_id" : 5, "color" : "White", "amount" : 200}
            ] }
        ]
    },
    "shippment" : {"shipping_by" : "DHL", "tracking_number" : "2001234897D"}
}

#PI related interface description
##/pi/q/count/json interface description
###description
query PI object by count index json data
###request type
get
###input
/?count_list=1,2,3
###output
The PI data storage, but add a "product_list" attribute that represent all product in this PI.

##/pi/q/count/html interface description
###description
Query PI object by count index html format
###request type
get
###input
/?count_list=1,2,3
###output
call /pi/q/count/json and process the got json data

##/pi/q/no/json interface description
###description
query PI detail by PI No.
###reques type
get
###input
/?pi_no=xxxx
###output
{error: error, data: ${the Order storage JSON} }.

##/pi/q/no/html interface description

##/pi/export/quatation interface description
###description
Export PI as quatation
###request type
Get
###permission
Admin
###input
/?pi_no=xxx
###output
PDF file than contans product in PI as quatation format.


