# bookmarkapi
Bookmark api

1)  /addbookmark
Type-Post
data parameters required- link,title,publisher

    • Adds bookmarks
    ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/1.png?raw=true)
    ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/2.png?raw=true)



    • Displays error message when  we try to add bookmark whose link already exists
       ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/3.png?raw=true)


2) /addtag
Type-post
data parameters required- title of tag

    • Adds tag
     ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/4.png?raw=true)
     ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/5.png?raw=true)



    • Displays error message when tag with given title already exists
     ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/6.png?raw=true)


3) /addtagtobookmark
type-post
data parameters required- link of bookmark and title of tag

    • Adds tag to bookmark (adds tag id to tags array of bookmark)
     ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/7.png?raw=true)
     ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/8.png?raw=true)



    • Displays error message when bookmark with given link does not exist
       ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/9.png?raw=true)


    • Displays error message when tag with given title does not exist
       ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/10.png?raw=true)


4) /deletetagfrombookmark
type-post
data parameters required- link of bookmark and title of tag

    • Deletes tag from bookmark (removes tag id from tags array of bookmark)
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/11.png?raw=true)


    • Displays error message when bookmark with given link does not exist
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/12.png?raw=true)


    • Displays error message when tag with given title does not exist
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/13.png?raw=true)

      
    • Displays error message when tag to be deleted is not a part of bookmark
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/14.png?raw=true)



5) /displayBookmarks
 type-get

    • Displays all bookmarks
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/15.png?raw=true)




6) /displayBookmarks
 type-get

    • Displays all tags
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/16.png?raw=true)


7) /deletetag
type-post
data parameters required- link of tag

    • Displays error message if tag does not exist
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/17.png?raw=true)

    • Deletes tag from all bookmarks and then deletes the tag
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/18.png?raw=true)
      
      Tag deleted from all the bookmarks of which it was a part of-
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/20.png?raw=true)
    
      Tag deleted-
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/19.png?raw=true)


8) /deletebookmark
type=post
data parameters required- link of bookmark to be deleted

    • Displays error message if bookmark does not exist
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/21.png?raw=true)

    • Deletes bookmark
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/22.png?raw=true)
      Bookmark deleted-
      ![alt text](https://github.com/SaumyaGupta-99/bookmarkapi/blob/main/images/23.png?raw=true)
