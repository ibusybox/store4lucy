#interface url
##servlet name
/queryProduct
##post param
queryType=byCount,
Count=50

#data struct between browser and server
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


#product data struct
##number
IP1-CS-001
##model
iPhone5

##name
iPhone5 metal case

##description
iPhone5 metal case best selling.

##image
![image](sample.jpg)

##suppliers
###supplier name
Chuangjida
####price
6 RMB

###supplier name
Niumowang
####price
7 RMB