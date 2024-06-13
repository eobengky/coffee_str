(function() {
    "use strict";

    function init() {
        getData();
        id('login-btn').addEventListener("click", handleLogin);
        id("search-btn2").addEventListener("click", getCoffeeFilter);
        id("cart-btn").addEventListener("click", getCart);
        id("submit-btn").addEventListener("click", addReviews);
        id("review-btn").addEventListener("click", getReviews);
        id("contact-btn").addEventListener("click", addContact);
        id("leavecontact-btn").addEventListener("click", viewContact);
        id("postReviews-btn").addEventListener("click", postReviews);
        id("main_page").addEventListener("click", returnHome);
    }

    /**
     * Handles the login response and performs necessary actions based on the user's credentials.
     *
     * @param {Object[]} data - An array of user data objects containing username, password, and name properties.
     */
    function loginResponse(data) {
        let username = id("username").value;
        let password = id("password").value;
        id("pg").textContent = "";
        for (let i = 0; i < data.length; i ++) {
            if (data[i]["username"] === username && data[i]["password"] == password) { 
                id("main-view").classList.remove("hidden");
                id("top-bar").classList.remove("hidden");
                id("login-section").classList.add("hidden");
                id("contact-page").classList.add("hidden");
                id("review-page").classList.add("hidden");
                id("review-view").classList.add("hidden");
                id("filter-view").classList.add("hidden");
                id("product-view").classList.add("hidden");
                id("cart-view").classList.add("hidden");
                id("user_name").textContent = data[i]["name"];
            }
        }
        id("pg").textContent = "Incorrect Username or Password";
    }

    /**
     * Handles the login process by fetching user data from the server and calling the loginResponse function.
     *
     * @async
     * @function handleLogin
     */
    async function handleLogin() {
        let url = "/user"; 
        try {
            let resp = await fetch(url);
            console.log(resp)
            let response = checkStatus(resp);
            response = await resp.json();
            loginResponse(response);
        } catch(err) {
            handleError(err);
        }
    }
    
    /**
     * This function fetches the data from 
     * data.json which is all the information 
     * about the coffee.
     */
    async function getData() {
        let url = "/data";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            processResponse(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function populates the main page
     * with all the items with their names, prices,
     * descriptions, and images using the data 
     * received from data.json.
     * @param {Object} data 
     */
    function processResponse(data) {
        for (let i = 0; i < data.length; i++)  {
            let article = gen("article");
            let h3 = gen("h3");
            let img = gen("img");
            let hr = gen("hr");
            let p1 = gen("p");
            let p2 = gen("span");
            h3.textContent = data[i]["name"];
            img.src = data[i]["image"];
            p1.textContent = data[i]["description"];
            p2.textContent = data[i]["price"];
            article.appendChild(h3);
            article.appendChild(img);
            article.appendChild(hr);
            article.appendChild(p1);
            article.appendChild(p2);
            article.addEventListener("click", () => {
                displayProduct(h3, img, p1, p2)
            });
            id("item-container").appendChild(article);
        }
    }

    function returnHome() {
        id("review-page").classList.add("hidden");
        id("login-section").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("main-view").classList.remove("hidden");
        id("contact-page").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("cart-view").classList.add("hidden");
    }

    /**
     * This function displays the product information
     * and customizations for the user to add the item
     * to their cart or leave a review.
     * @param {DOM element} h3 
     * @param {DOM element} img 
     * @param {DOM element} p1 
     * @param {DOM elemenr} p2 
     */
    function displayProduct(h3, img, p1, p2) {
        id("product-view").classList.remove("hidden");
        id("review-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("login-section").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        id("item-name").textContent = h3.textContent;
        id("product-img").src = img.src;
        id("item-desc").textContent = p1.textContent;
        id("price-value").textContent = p2.textContent;
        id("cartBtn").addEventListener("click", () => addCart(h3, img, p2));
    }
    
    /**
     * This function adds all other pages to hidden display 
     * and displays the review page for the viewer to leave reviews
     * on the coffee.
     */
    function postReviews() {
        id("review-page").classList.remove("hidden");
        id("main-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        id("login-section").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("filter-view").classList.add("hidden");
    }

    /**
     * This function adds all other pages to hidden display 
     * and displays the contact page for the viewer to leave comments.
     */
    function viewContact() {
        id("contact-page").classList.remove("hidden");
        id("login-section").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("cart-view").classList.add("hidden");
    }

    /**
     * This function fetches the reviews from review.json
     */
    async function getReviews() {
        let url = "/review";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            viewReviews(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function adds the review using the person's name, 
     * coffee name, and review words to the review.json. 
     */
    async function addReviews() {
        let params = new FormData();
        let name = id("name").value;
        let coffee = id("coffee").value;
        let review = id("review-words").value;
        params.append("name", name);
        params.append("coffee", coffee);
        params.append("review", review);
        try {
            returnHome();
            let resp = await fetch("/addToReviews", {method : "POST", body : params});
            checkStatus(resp);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function adds the person's name, the date, 
     * and the information they wrote into contact.json
     */
    async function addContact() {
        let params = new FormData();
        let name = id("contact-name").value;
        let date = id("date").value;
        let information = id("information").value;
        params.append("name", name);
        params.append("date", date);
        params.append("info", information);
        try {
            let resp = await fetch("/addToContact", {method : "POST", body : params});
            checkStatus(resp);
            returnHome();
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function allows for the client to
     * view all the reviews of all the products so far.
     * @param {Object} response 
     */
    function viewReviews(response) {
        while (id("review-view").firstChild) {
            id("review-view").removeChild(id("review-view").firstChild);
        }
        id("review-view").classList.remove("hidden");
        id("login-section").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("main-view").classList.add("hidden");
        for (let i = 0; i < response.length; i++) {
            let h2 = gen("h2");
            let span2 = gen("span");
            let h3 = gen("h3");
            let span3 = gen("span");
            let p = gen("p");
            let span4 = gen("span");
            let article = gen("article");
            h2.textContent = "Name: ";
            h3.textContent = "Coffee type: ";
            p.textContent = "Review: "
            span2.textContent = response[i]["name"];
            span3.textContent = response[i]["coffee"];
            span4.textContent = response[i]["review"];
            h2.appendChild(span2);
            h3.appendChild(span3);
            p.appendChild(span4);
            article.appendChild(h2);
            article.appendChild(h3);
            article.appendChild(p);
            id("review-view").appendChild(article);
        }
    }

    /**
     * The function adds the selected item's name, image
     * src, and price vcalue to cart.json 
     * @param {DOM element} h3 
     * @param {DOM element} img 
     * @param {DOM element} price 
     */
    async function addCart(h3, img, price) {
        if (id("product-flavor").value === "Choose-flavor" && id("product-quantity").value === "Choose-quantity") {
            id("product-p").textContent = "You must select a flavor and quantity for the item to be added to your cart!";
        } else {
            let params = new FormData();
            let flavor = id("product-flavor").value;
            let quantity = id("product-quantity").value;
            params.append("name", h3.textContent);
            params.append("quantity", quantity);
            params.append("flavor", flavor);
            params.append("image", img.src);
            params.append("price", price.textContent);
            try {
                let resp = await fetch("/addToCart", {method : "POST", body : params});
                checkStatus(resp);
                id("product-p").textContent = "Your item has been added to the cart!";
                id("product-flavor").value = "Choose-flavor";
                id("product-quantity").value = "Choose-quantity";
            } catch(err) {
                handleError(err);
            }
        }
    }

    /**
     * This function fetches the cart information from 
     * the cart.json file.
     */
    async function getCart() {
        let url = "/cart";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            viewCart(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * This function allows for the client to view the items in the 
     * cart.
     * @param {Object} response 
     */
    function viewCart(response) {
        while (id("cart-view").firstChild) {
            id("cart-view").removeChild(id("cart-view").firstChild);
        }
        id("cart-view").classList.remove("hidden");
        id("login-section").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("filter-view").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("product-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        id("review-view").classList.add("hidden");
        for (let i = 0; i < response.length; i++) {
            let img = gen("img");
            let section = gen("section");
            let h4 = gen("h4");
            let p1 = gen("p");
            let p2 = gen("p");
            let article = gen("article");
            let p3 = gen("p");
            let span1 = gen("span");
            let span2 = gen("span");
            let span3 = gen("span");
            let button = gen("button");
            img.src = response[i]["image"];
            h4.textContent = response[i]["name"];
            p1.textContent = "Flavor: ";
            p2.textContent = "Quantity: ";
            p3.textContent = "Price: $";
            button.textContent = "Click to remove.";
            span1.textContent = response[i]["flavor"];
            span2.textContent = response[i]["quantity"];
            span3.textContent = response[i]["price"];
            p1.appendChild(span1);
            p2.appendChild(span2);
            p3.appendChild(span3);
            section.appendChild(h4);
            section.appendChild(p1);
            section.appendChild(p2);
            section.appendChild(p3);
            article.appendChild(img);
            article.appendChild(section);
            article.appendChild(button);
            id("cart-view").appendChild(article);
            button.addEventListener("click", () => {
                removeCart(h4, span1, span2)
            });
        }
    }

    async function removeCart(h4, span1, span2) {
        let params = new FormData();
        let name = h4.textContent;
        let flavor = span1.textContent;
        let quantity = span2.textContent;
        params.append("name", name);
        params.append("quantity", quantity);
        params.append("flavor", flavor);  
        try {
            let resp = await fetch("/removeCart", {method : "POST", body : params});
            checkStatus(resp);
        } catch(err) {
            handleError(err);
        }
        getCart();
    }

    /**
     * This function fetches the data from 
     * data.json which is all the information 
     * about the coffee to filter the coffee
     * origin.
     */
    async function getCoffeeFilter() {
        let url = "/data";
        try {
            let resp = await fetch(url);
            let response = checkStatus(resp);
            response = await resp.json();
            coffeeResults(response);
        } catch(err) {
            handleError(err);
        }
    }

    /**
     * Displays coffee products based on the selected origin and handles the filter view.
     *
     * @param {Object[]} coffee - An array of coffee product objects.
     */
    function coffeeResults(coffee) {
        id("filter-view").classList.remove("hidden");
        id("product-view").classList.add("hidden");
        id("review-page").classList.add("hidden");
        id("contact-page").classList.add("hidden");
        id("review-view").classList.add("hidden");
        id("login-section").classList.add("hidden");
        id("cart-view").classList.add("hidden");
        id("main-view").classList.add("hidden");
        while (id("filter-container").firstChild) {
            id("filter-container").removeChild(id("filter-container").firstChild);
        }
        if (id("origin-options").value === "Kenya") {
            for (let i = 0; i < coffee.length; i++) {
                if (coffee[i]["origin-type"] === "Kenya") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = coffee[i]["name"];
                img.src = coffee[i]["image"];
                p1.textContent = coffee[i]["description"];
                p2.textContent = coffee[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    displayProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("origin-options").value === "Ethiopia") {
            for (let i = 0; i < coffee.length; i++) {
                if (coffee[i]["origin-type"] === "Ethiopia") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = coffee[i]["name"];
                img.src = coffee[i]["image"];
                p1.textContent = coffee[i]["description"];
                p2.textContent = coffee[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    displayProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("origin-options").value === "Rwanda") {
            for (let i = 0; i < coffee.length; i++) {
                if (coffee[i]["origin-type"] === "Rwanda") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = coffee[i]["name"];
                img.src = coffee[i]["image"];
                p1.textContent = coffee[i]["description"];
                p2.textContent = coffee[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    displayProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("origin-options").value === "Malawi") {
            for (let i = 0; i < coffee.length; i++) {
                if (coffee[i]["origin-type"] === "Malawi") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = coffee[i]["name"];
                img.src = coffee[i]["image"];
                p1.textContent = coffee[i]["description"];
                p2.textContent = coffee[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    displayProduct(h3, img, p1, p2)
                });
                }
            }
        } else if (id("origin-options").value === "Tanzania") {
            for (let i = 0; i < coffee.length; i++) {
                if (coffee[i]["origin-type"] === "Tanzania") {
                    let article = gen("article");
                let h3 = gen("h3");
                let img = gen("img");
                let hr = gen("hr");
                let p1 = gen("p");
                let p2 = gen("span");
                h3.textContent = coffee[i]["name"];
                img.src = coffee[i]["image"];
                p1.textContent = coffee[i]["description"];
                p2.textContent = coffee[i]["price"];
                article.appendChild(h3);
                article.appendChild(img);
                article.appendChild(hr);
                article.appendChild(p1);
                article.appendChild(p2);
                id("filter-container").appendChild(article);
                article.addEventListener("click", () => {
                    displayProduct(h3, img, p1, p2)
                });
                }
            }
        } 
        id("origin-options").value = "Choose-origin";
    }

    function handleError() {
        console.log("An error ocurred fetching the store data. Please try again later.");
    }

    init();
})();