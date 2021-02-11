const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Post extends Model {
    static upvote(body, models) {
      return models.Favorite.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            [
              sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'),
              'favorite_count'
            ]
          ],
          include: [
            {
              model: models.Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id'],
              include: {
                model: models.User,
                attributes: ['username']
              }
            }
          ]
        });
      });
    }
  }
  

Post.init( 
    {   
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 200]
            }
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,    

        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isURL: true
            }
          },  
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'post',
              key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
    
);

module.exports = Post;
