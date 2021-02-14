module.exports = {
    check_user: (post_user, user_id) => {
        if(post_user === user_id){
            return true;
        } 

        return false;
    }
}