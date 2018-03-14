// Write your JavaScript code.
norris = {
    api: {
        urls: {
            getRandomJoke: 'https://api.chucknorris.io/jokes/random',
            getJokeForCategory: 'https://api.chucknorris.io/jokes/random?category=',
            getJokeCategories: 'https://api.chucknorris.io/jokes/categories',
            search: 'https://api.chucknorris.io/jokes/search?query={query}'
        },
        getJokeCategories: function () {
            return axios.get(norris.api.urls.getJokeCategories);
        },
        getRandomJoke: function () {
            return axios.get(norris.api.urls.getRandomJoke);
        },
        getJokeForCategory: function (category) {
            return axios.get(norris.api.urls.getJokeForCategory + category);
        },
    },

    showJokeCategories: function (response) {
        //{ First: "first", Last: "last" }
        axios.post('/Home/JokeCategories', response.data)
            .then(function (response) {
                console.log(response);
                $("#jokeCategories").html(response.data);

                $('.jokeCategoryButton').click(function () {
                    var category = $(this).attr("value");
                    norris.displayJokeForCategory(category);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    showRandomJoke: function (result) {
        $("#randomJoke").html(result.data.value);
    },

    showCategoryJoke: function (result) {
        $("#categoryJoke").html(result.data.value);
    },

    displayJokeCategories: function () {
        norris.api.getJokeCategories().then(result => norris.showJokeCategories(result));
    },

    displayRandomJoke: function () {
        norris.api.getRandomJoke().then(result => norris.showRandomJoke(result));
    },

    displayJokeForCategory: function (category) {
        norris.api.getJokeForCategory(category).then(result => norris.showCategoryJoke(result));
    },

    load: function () {
        norris.displayJokeCategories();
        norris.displayRandomJoke();

        $('#randomJokeButton').click(function () {
            norris.displayRandomJoke();
        });


    },
};