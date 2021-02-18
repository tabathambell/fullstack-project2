module.exports = {
    check_user: (post_user, user_id) => {
        if(post_user === user_id){
            return true;
        } 

        return false;
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
          date
        ).getFullYear()}`;
      }
}