export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      archive_bookmarks: {
        Row: {
          created_at: string | null;
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_bookmarks_post_id_fkey2';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'archive_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'archive_bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_comment_bookmarks: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_comment_bookmarks_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'archive_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'archive_comment_bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_comment_likes: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_likes_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'archive_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_like_table_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_comments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          post_id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          post_id: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'archive_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'archive_comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_images: {
        Row: {
          id: string;
          image_url: string | null;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          image_url?: string | null;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          image_url?: string | null;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_images_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'archive_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'archive_images_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_likes_post_id_fkey2';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'archive_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'archive_likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_posts: {
        Row: {
          category: string;
          content: string;
          created_at: string;
          id: string;
          thumbnail: string | null;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          category?: string;
          content: string;
          created_at?: string;
          id?: string;
          thumbnail?: string | null;
          title: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          category?: string;
          content?: string;
          created_at?: string;
          id?: string;
          thumbnail?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_post_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_reply: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          reply: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          reply: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          reply?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'archive_reply_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'archive_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'archive_reply_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      archive_tags: {
        Row: {
          id: string;
          post_id: string;
          tag: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          post_id: string;
          tag?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string;
          tag?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'tags_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'archive_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tags_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_bookmarks: {
        Row: {
          created_at: string | null;
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'forum_bookmarks_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'forum_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'forum_bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_comment_bookmarks: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'forum_comment_bookmarks__user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'forum_comment_bookmarks_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'forum_comments';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_comment_likes: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_likes_duplicate_comment_id_fkey1';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'forum_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_likes_duplicate_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_comments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          post_id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          post_id: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'forum_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'forum_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'forum_comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_images: {
        Row: {
          id: string;
          image_url: string | null;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          image_url?: string | null;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          image_url?: string | null;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'image_post_id_fkey1';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'forum_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'images_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'forum_likes_post_id_fkey1';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'forum_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'forum_likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_posts: {
        Row: {
          category: string;
          content: string;
          created_at: string;
          forum_category: string;
          id: string;
          thumbnail: string | null;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          category?: string;
          content: string;
          created_at?: string;
          forum_category: string;
          id?: string;
          thumbnail?: string | null;
          title: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          category?: string;
          content?: string;
          created_at?: string;
          forum_category?: string;
          id?: string;
          thumbnail?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ForumArticle_userId_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_reply: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          reply: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          reply: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          reply?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'forum_reply_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'forum_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'forum_reply_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      forum_tags: {
        Row: {
          id: string;
          post_id: string;
          tag: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          post_id: string;
          tag?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          post_id?: string;
          tag?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'forum_tags_post_id_fkey1';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'forum_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'forum_tags_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      notice: {
        Row: {
          context: string;
          created_at: string;
          id: string;
        };
        Insert: {
          context: string;
          created_at?: string;
          id?: string;
        };
        Update: {
          context?: string;
          created_at?: string;
          id?: string;
        };
        Relationships: [];
      };
      qna_bookmarks: {
        Row: {
          created_at: string | null;
          id: string;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_bookmarks_post_id_fkey1';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_comment_bookmarks: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_comment_bookmarks_comment_id_fkey2';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'qna_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_comment_bookmarks_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_comment_likes: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_comment_likes_comment_id_fkey2';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'qna_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_comment_likes_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_comment_tag: {
        Row: {
          comment_id: string;
          id: string;
          tag: string | null;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          id?: string;
          tag?: string | null;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          id?: string;
          tag?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_comment_tag_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'qna_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_comment_tag_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_comments: {
        Row: {
          comment: string;
          created_at: string;
          id: string;
          post_id: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          id?: string;
          post_id: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_comments_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_comments_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_images: {
        Row: {
          id: string;
          image_url: string | null;
          post_id: string | null;
          user_id: string | null;
        };
        Insert: {
          id?: string;
          image_url?: string | null;
          post_id?: string | null;
          user_id?: string | null;
        };
        Update: {
          id?: string;
          image_url?: string | null;
          post_id?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_images_post_id_fkey1';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_images_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'likes_qna_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'likes_qna_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_post_reply: {
        Row: {
          created_at: string;
          id: string;
          post_id: string | null;
          post_reply_content: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id?: string | null;
          post_reply_content: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string | null;
          post_reply_content?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_post_reply_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_post_reply_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_posts: {
        Row: {
          category: string;
          content: string;
          created_at: string;
          id: string;
          selected_comment: string | null;
          thumbnail: string | null;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          category?: string;
          content: string;
          created_at?: string;
          id?: string;
          selected_comment?: string | null;
          thumbnail?: string | null;
          title: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          category?: string;
          content?: string;
          created_at?: string;
          id?: string;
          selected_comment?: string | null;
          thumbnail?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_post_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_posts_selected_comment_fkey';
            columns: ['selected_comment'];
            isOneToOne: false;
            referencedRelation: 'qna_comments';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_reply: {
        Row: {
          comment_id: string;
          created_at: string;
          id: string;
          reply: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          created_at?: string;
          id?: string;
          reply: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          comment_id?: string;
          created_at?: string;
          id?: string;
          reply?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_reply_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'qna_comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_reply_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      qna_tags: {
        Row: {
          id: string;
          post_id: string;
          tag: string | null;
          user_id: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          tag?: string | null;
          user_id?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          tag?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'qna_tags_post_id_fkey2';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'qna_posts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'qna_tags_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          email: string;
          github_url: string | null;
          id: string;
          info: string | null;
          nickname: string | null;
          profile_image: string;
        };
        Insert: {
          email: string;
          github_url?: string | null;
          id?: string;
          info?: string | null;
          nickname?: string | null;
          profile_image?: string;
        };
        Update: {
          email?: string;
          github_url?: string | null;
          id?: string;
          info?: string | null;
          nickname?: string | null;
          profile_image?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      search_posts_with_comments: {
        Args: {
          keyword: string;
        };
        Returns: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          created_at: string;
          updated_at: string;
          comment_count: number;
          like_count: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
