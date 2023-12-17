const { QueryFile } = require('pg-promise');
const { join } = require('path');
module.exports = {
    userSQL: {
        add: sql("user/add.sql"),
        getByUserName: sql("user/getByUserName.sql"),
        get: sql("user/get.sql"),
        count: sql("user/count.sql"),
    },
    // movieSQL: {
    //     add: sql("movie/add.sql"),
    //     add_Movie_Cast: sql("movie/add_movie_cast.sql"),
    //     get_rating_sorted: sql("movie/get_rating_sorted.sql"),
    //     get_limit_rating_sorted: sql("movie/get_limit_rating_sorted.sql"),
    //     get_limit_box_office_sorted: sql("movie/get_limit_box_office_sorted.sql"),
    //     search: sql("movie/search.sql"),
    //     count_search: sql("movie/count_search_result.sql"),
    //     get_by_id: sql("movie/get_by_id.sql"),
    //     get_list_ralated_to_cast: sql("movie/get_list_ralated_to_cast.sql")
    // },
}

function sql(file) {

    const fullPath = join(__dirname, file); // generating full path;

    const options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true

        // See also property 'params' for two-step template formatting
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        console.error(qf.error);
    }

    return qf;

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}