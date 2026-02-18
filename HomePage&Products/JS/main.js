


window.addEventListener("scroll", () => {
    if (scrollY > 134.44) {
        console.log("hamada");
        document.getElementById("nav").classList.add("fixed-top");
        document.getElementById("nav").style.transition = "all 0.5s"
    }
})














products =
    [
        {
            "product_id": 1,
            "name": "Samsung Galaxy A56",
            "description": "High-end smartphone with advanced features.",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://mdsmobile.ae/cdn/shop/files/SM-A566_Galaxy_A56_5G_Awesome_Olive_Front_1000x.jpg?v=1741865976",
            "discount": 10,
            "availability": true,
            "brand": "Samsung",
            "category": "phone",
            "dailySale": true,
            "monthSale": false,
            "rating": 4.5,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 1,
                    "rating": 5,
                    "comment": "Great phone with a superb camera!"
                },
                {
                    "user_id": 2,
                    "rating": 4,
                    "comment": "Good performance, but the battery life could be better."
                }
            ]
        },
        {
            "product_id": 2,
            "name": "Acer Aspire",
            "description": "Powerful laptop for work and gaming.",
            "price": 999.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/61GfMDJhhhL._AC_SX679_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "acer",
            "category": "laptop",
            "dailySale": false,
            "monthSale": true,
            "rating": 3.7,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 3,
                    "rating": 5,
                    "comment": "Excellent laptop for gaming and work tasks."
                },
                {
                    "user_id": 4,
                    "rating": 4,
                    "comment": "Good value for the price."
                }
            ]
        },
        {
            "product_id": 3,
            "name": "Xiaomi Wireless Earphones",
            "description": "Premium wireless headphones with noise-cancellation.",
            "price": 149.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/51hgEktDwlL._AC_SX466_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "Xiaomi",
            "category": "bluetooth-speaker",
            "dailySale": false,
            "monthSale": false,
            "rating": 2.8,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 5,
                    "rating": 5,
                    "comment": "Top-notch sound quality and comfort."
                },
                {
                    "user_id": 6,
                    "rating": 4,
                    "comment": "Impressive noise-cancellation, but a bit pricey."
                }
            ]
        },
        {
            "product_id": 4,
            "name": "HUAWEI WATCH FIT 3",
            "description": "Feature-packed smartwatch with fitness tracking.",
            "price": 199.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/51OwItmBikL._AC_SX466_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "huawei",
            "category": "accessories",
            "dailySale": false,
            "monthSale": false,
            "rating": 3.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 7,
                    "rating": 4,
                    "comment": "Great value for the features it offers."
                },
                {
                    "user_id": 8,
                    "rating": 5,
                    "comment": "Sleek design and accurate fitness tracking."
                }
            ]
        },
        {
            "product_id": 5,
            "name": "Samsung 43 Inch 4K UHD",
            "description": "High-definition smart TV with built-in streaming apps.",
            "price": 499.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/61v86Il5XHL._AC_SX466_.jpg",
            "discount": 15,
            "availability": true,
            "brand": "Samsung",
            "category": "tv",
            "dailySale": true,
            "monthSale": false,
            "rating": 5,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 9,
                    "rating": 5,
                    "comment": "Exceptional image quality and versatility."
                },
                {
                    "user_id": 10,
                    "rating": 4,
                    "comment": "A bit heavy, but the results are worth it."
                }
            ]
        },
        {
            "product_id": 6,
            "name": "Samsung 27-Inch",
            "description": "G55C Odyssey QHD 2K Curved Gaming Monitor, HRDR 10, VA Panel, 1ms MPRT, 165hz with Game Mode, Supports AMD FreeSync, HDMI and DisplayPort, 3 Years Local Warranty",
            "price": 799.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/71gaBO+mp6L._AC_SX679_.jpg",
            "discount": 8,
            "availability": true,
            "brand": "samsung",
            "category": "monitor",
            "dailySale": false,
            "monthSale": true,
            "rating": 3,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 11,
                    "rating": 5,
                    "comment": "Stunning picture quality and user-friendly interface."
                },
                {
                    "user_id": 12,
                    "rating": 4,
                    "comment": "A great addition to our home entertainment setup."
                }
            ]
        },
        {
            "product_id": 7,
            "name": "HP EliteDesk",
            "description": "705 G2 - Sff- A8 Pro-8650B 3.2 GHz - 8 GB - 500 GB",
            "price": 299.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/718fYRN+qNL._AC_SX679_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "hp",
            "category": "desktop",
            "dailySale": false,
            "monthSale": false,
            "rating": 4.4,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 13,
                    "rating": 4,
                    "comment": "Good value for the price, but the battery life could be better."
                },
                {
                    "user_id": 14,
                    "rating": 5,
                    "comment": "Ideal for both work and entertainment on the go."
                }
            ]
        },
        {
            "product_id": 8,
            "name": "Lenovo LOQ",
            "description": "Powerful laptop for work and gaming.",
            "price": 999.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/51rSsB82hZL._AC_SX679_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "lenovo",
            "category": "laptop",
            "dailySale": false,
            "monthSale": true,
            "rating": 3,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 15,
                    "rating": 5,
                    "comment": "Excellent laptop for gaming and work tasks."
                },
                {
                    "user_id": 16,
                    "rating": 4,
                    "comment": "Good value for the price."
                }
            ]
        },
        {
            "product_id": 9,
            "name": "Xbox one Microsoft Controller",
            "description": "Xbox Microsoft WLC M Controller, Black, 70 x 170 x 180 mm",
            "price": 399.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/712Kf43qj4L._AC_SX679_.jpg",
            "discount": 10,
            "availability": true,
            "brand": "microsoft",
            "category": "gaming",
            "dailySale": true,
            "monthSale": false,
            "rating": 5,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 17,
                    "rating": 5,
                    "comment": "Incredible gaming performance and graphics."
                },
                {
                    "user_id": 18,
                    "rating": 4,
                    "comment": "A must-have for gaming enthusiasts."
                }
            ]
        },
        {
            "product_id": 10,
            "name": "JBL Go 4 Portable Bluetooth Speaker",
            "description": "JBL Go 4 Portable Bluetooth Speaker with IP67 Waterproof Design, 7H Playtime, PlaytimeBoost, JBL Pro Sound, Deep Bass, Multi- Speaker Connection for Stereo Sound - Black |1 year manufacturer warranty",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/71HdLDJEEUL._AC_SX466_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "jbl",
            "category": "bluetooth-speaker",
            "dailySale": false,
            "monthSale": false,
            "rating": 3,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 19,
                    "rating": 5,
                    "comment": "Incredible gaming performance and graphics."
                },
                {
                    "user_id": 20,
                    "rating": 4,
                    "comment": "A must-have for gaming enthusiasts."
                }
            ]
        },
        {
            "product_id": 11,
            "name": "Apple Watch SE",
            "description": "Apple Watch SE (2nd Gen) [GPS 40mm] Smartwatch with Midnight Aluminum Case with Midnight Sport Band S/M. Fitness & Sleep Tracker, Crash Detection, Heart Rate Monitor",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/61ZL5tN-+GL._AC_SX466_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "apple",
            "category": "accessories",
            "dailySale": false,
            "monthSale": false,
            "rating": 5,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 21,
                    "rating": 5,
                    "comment": "Incredible gaming performance and graphics."
                },
                {
                    "user_id": 22,
                    "rating": 4,
                    "comment": "A must-have for gaming enthusiasts."
                }
            ]
        },
        {
            "product_id": 12,
            "name": "Razer DeathAdder Essential Gaming Mouse",
            "description": "Razer DeathAdder Essential Gaming Mouse: 6400 DPI Optical Sensor -5 Programmable Buttons - Mechanical Switches - Rubber Side Grips - Mercury White",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/51xLy45CSfL._AC_SX679_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "razer",
            "category": "gaming",
            "dailySale": false,
            "monthSale": true,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 23,
                    "rating": 3,
                    "comment": "1. This mouse is not lightweight junk.2. Braided cables are worse.3. Silicone side grips were never that great"
                },
                {
                    "user_id": 24,
                    "rating": 4,
                    "comment": "A must-have for gaming enthusiasts."
                }
            ]
        },
        {
            "product_id": 13,
            "name": "Apple iPhone 16 Pro Max",
            "description": "Apple iPhone 16 Pro Max (256 GB) - Black Titanium",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/61veAtnXzWL._AC_SX679_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "apple",
            "category": "phone",
            "dailySale": false,
            "monthSale": false,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 25,
                    "rating": 5,
                    "comment": "Perfect Phone and fast delivery."
                },
                {
                    "user_id": 26,
                    "rating": 4,
                    "comment": "You can’t be wrong going with this choice if you’re coming from iPhone 12 or lesser"
                }
            ]
        },
        {
            "product_id": 14,
            "name": "JBL Flip 6",
            "description": "JBL Flip 6 Portable IP67 Waterproof Speaker w Bold JBL Original Pro Sound, 2-Way Speaker, Powerful Sound and Deep Bass, 12 Hours Battery, Safe USB-C Charging Protection Black, 1 year local warranty",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/71vvcOIHi+L._AC_SX466_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "jbl",
            "category": "bluetooth-speaker",
            "dailySale": false,
            "monthSale": true,
            "rating": 2,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 27,
                    "rating": 5,
                    "comment": "Amazing sound quality but not water proof. Be careful"
                },
                {
                    "user_id": 28,
                    "rating": 4,
                    "comment": "Not suitable for outdoors"
                }
            ]
        },
        {
            "product_id": 15,
            "name": "Apple MacBook Air laptop",
            "description": "Apple MacBook Air laptop with M2 chip: 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD storage, 1080p FaceTime HD camera. Works with iPhone and iPad; Starlight; English",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/71C6vQtP2iL._AC_SX679_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "apple",
            "category": "laptop",
            "dailySale": true,
            "monthSale": false,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 29,
                    "rating": 5,
                    "comment": "Amazing sound quality but not water proof. Be careful"
                },
                {
                    "user_id": 30,
                    "rating": 4,
                    "comment": "Not suitable for outdoors"
                }
            ]
        },
        {
            "product_id": 16,
            "name": "HP 1HK80EA ProDesk",
            "description": "HP 1HK80EA ProDesk 600 G3 Microtower PC - Intel Core i5, 3.60 GHz, 500 GB",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/81b6i6Z2T7L._AC_SY879_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "hp",
            "category": "desktop",
            "dailySale": false,
            "monthSale": true,
            "rating": 3,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 31,
                    "rating": 5,
                    "comment": "Amazing sound quality but not water proof. Be careful"
                },
                {
                    "user_id": 32,
                    "rating": 4,
                    "comment": "Not suitable for outdoors"
                }
            ]
        },
        {
            "product_id": 17,
            "name": "Apple TV Box 3rd Generation",
            "description": "Apple TV Box 3rd Generation, Stream/Movies over WiFi/Ethernet, A15 Bionic, 128GB Storage, Up to 4K with Dolby Vision & HDR10+, Works with Thread Mesh Networks, Apple TV+, Netflix, Live, Black",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/61HGvrbamzL._AC_SX466_.jpg",
            "discount": 0,
            "availability": true,
            "brand": "apple",
            "category": "tv",
            "dailySale": false,
            "monthSale": false,
            "rating": 5,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 33,
                    "rating": 5,
                    "comment": "Amazing sound quality but not water proof. Be careful"
                },
                {
                    "user_id": 34,
                    "rating": 4,
                    "comment": "Not suitable for outdoors"
                }
            ]
        },
        {
            "product_id": 18,
            "name": "Apple TV 4K Remote",
            "description": "Compatible with Apple TV 4K Remote 2021 Silicone Cover , Silicone Case for Apple TV 4K 6 Generation 2021 Remote Control (Black)",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/51FwBE6HBcL._AC_SX466_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "apple",
            "category": "tv",
            "dailySale": false,
            "monthSale": true,
            "rating": 5,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 35,
                    "rating": 5,
                    "comment": "Amazing sound quality but not water proof. Be careful"
                },
                {
                    "user_id": 36,
                    "rating": 4,
                    "comment": "Not suitable for outdoors"
                }
            ]
        },
        {
            "product_id": 19,
            "name": "Deepzone Wired Controller for Xbox Series X,S",
            "description": "Deepzone Wired Controller for Xbox Series X|S, Game Controller, Gamepad, Compatible with Xbox One, Xbox Series X/S, Windows 7/8/10/11 Camo Electric Volt",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/71UUX8t4spL._AC_SX679_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "microsoft",
            "category": "gaming",
            "dailySale": true,
            "monthSale": false,
            "rating": 3,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 37,
                    "rating": 4,
                    "comment": "Amazing!"
                },
                {
                    "user_id": 38,
                    "rating": 2,
                    "comment": "Everything was great with this controller out of the box, but after a few weeks the right trigger button sticks down. It feels like there is some sort of adhesive inside the button that keeps it from coming back up. Anyway, the controller is pretty much useless now."
                }
            ]
        },
        {
            "product_id": 20,
            "name": "Adjustable laptop stand",
            "description": "Adjustable laptop stand, portable aluminium laptop riser laptop holder for desk, foldable ventilated cooling computer support stand for apple macbook pro/air, hp, sony, dell, more 10-15.6''",
            "price": 599.99,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/81T3mcf46RL._AC_SX466_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "other",
            "category": "accessories",
            "dailySale": false,
            "monthSale": true,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 39,
                    "rating": 4,
                    "comment": "Amazing!"
                },
                {
                    "user_id": 40,
                    "rating": 5,
                    "comment": "Excellent, it does what it is meant to do. Its grippy so there is no scope of it sliding on smooth surfaces and its highly adjustable."
                }
            ]
        },
        {
            "product_id": 21,
            "name": "Apple MacBook pro",
            "description": "Apple Macbook Air 2020 Model, (13-Inch, Apple M1 chip with 8-core CPU and 7-core GPU, 8GB, 256GB, MGN63), Eng-KB, Space Gray",
            "price": 745,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg",
            "discount": 5,
            "availability": true,
            "brand": "apple",
            "category": "laptop",
            "dailySale": false,
            "monthSale": true,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 41,
                    "rating": 2,
                    "comment": "It said English keyboard. It was Arabic and English. Key stuck.I had to return it"
                },
                {
                    "user_id": 42,
                    "rating": 5,
                    "comment": "Excellent, it does what it is meant to do. Its grippy so there is no scope of it sliding on smooth surfaces and its highly adjustable."
                }
            ]
        },
        {
            "product_id": 22,
            "name": "Microsoft Xbox 360",
            "description": "games console xbox 360",
            "price": 192.82,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/61WqkmreFSL._SL1000_.jpg",
            "discount": 10,
            "availability": true,
            "brand": "microsoft",
            "category": "gaming",
            "dailySale": false,
            "monthSale": true,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 43,
                    "rating": 3,
                    "comment": "not working"
                },
                {
                    "user_id": 44,
                    "rating": 5,
                    "comment": "Excellent, it does what it is meant to do. Its grippy so there is no scope of it sliding on smooth surfaces and its highly adjustable."
                }
            ]
        },
        {
            "product_id": 23,
            "name": "sony PlayStation 5",
            "description": "Sony PlayStation 5 SLIM Disc [ NEW 2023 Model ] - International Version",
            "price": 647,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/51KBX8ycq1L._AC_SX679_.jpg",
            "discount": 10,
            "availability": true,
            "brand": "sony",
            "category": "gaming",
            "dailySale": true,
            "monthSale": false,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 45,
                    "rating": 3,
                    "comment": "not working"
                },
                {
                    "user_id": 46,
                    "rating": 5,
                    "comment": "Excellent, it does what it is meant to do. Its grippy so there is no scope of it sliding on smooth surfaces and its highly adjustable."
                }
            ]
        },
        {
            "product_id": 24,
            "name": "JBL BOOMBOX2BLKAS Boombox 2",
            "description": "JBL BOOMBOX2BLKAS Boombox 2 Portable Bluetooth Speaker, Black",
            "price": 620,
            "unit": "Piece",
            "image": "https://m.media-amazon.com/images/I/81ct-8nmjZL._AC_SX679_.jpg",
            "discount": 15,
            "availability": true,
            "brand": "jbl",
            "category": "bluetooth-speaker",
            "dailySale": true,
            "monthSale": false,
            "rating": 4.6,
            "sellerId": 1,
            "count": 0,
            "reviews": [
                {
                    "user_id": 47,
                    "rating": 5,
                    "comment": "Amazing sound quality but not water proof. Be careful"
                },
                {
                    "user_id": 48,
                    "rating": 5,
                    "comment": "Excellent, it does what it is meant to do."
                }
            ]
        }
    ];

(function () {
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(0, document.getElementById("row-data"));
    displayProducts(4, document.getElementById("row-data-two"));
})();

function displayProducts(x, container) {
    if (JSON.parse(localStorage.getItem("products"))) {
        // Then Display
        productArray = JSON.parse(localStorage.getItem("products"));
        console.log(productArray);

        let productBox = "";
        if (x === 0) {
            for (let i = 0; i < 4; i++) {
                productBox +=
                    `
                                <div class="col-lg-3">
                                    <div class="card w-100 p-0 m-0" style="cursor:pointer;"  >
                                        <img src="${productArray[i].image}" class="card-img-top" alt="${productArray[i].name}" height=200>
                                        <div class="card-body">
                                            <h5 class="card-title">${productArray[i].name.slice(0, 15)}</h5>
                                            <p class="card-text">${productArray[i].price}$</p>
                                        </div>
                                    </div>
                                </div>
                    `
            }

        }
        else {
            productBox = `
                        <div class="card col-12 col-lg-6" style="background-color:transparent !important;cursor:pointer;">
                             <img src="${productArray[20].image}" class="card-img-top" alt="${productArray[20].name}" height=200>
                                        <div class="card-body">
                                            <h5 class="card-title">${productArray[20].name.slice(0, 15)}</h5>
                                            <p class="card-text">${productArray[20].price}$</p>
                                        </div>
                        </div>

                        <div class="card col-12  col-lg-3" style="background-color:transparent !important;cursor:pointer;">
                             <img src="${productArray[21].image}" class="card-img-top" alt="${productArray[21].name}" height=200>
                                        <div class="card-body">
                                            <h5 class="card-title">${productArray[21].name.slice(0, 15)}</h5>
                                            <p class="card-text">${productArray[21].price}$</p>
                        </div>
                        </div>


                    <div class="card col-12  col-lg-3" style="background-color:transparent !important;cursor:pointer;">
                             <img src="${productArray[9].image}" class="card-img-top" alt="${productArray[9].name}" height=200>
                                        <div class="card-body">
                                            <h5 class="card-title">${productArray[9].name.slice(0, 15)}</h5>
                                            <p class="card-text">${productArray[9].price}$</p>
                    </div>
                        </div>
`

        }


        container.innerHTML += productBox;
        console.log(productBox);
    }
}













