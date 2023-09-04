## Live URL
- https://main--cosmic-crumble-da4920.netlify.app/


## Api Design 🌐

### Posts Api Design 📜

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Create Post</span> \
**Endpoint (URL):** /api/v1/posts \
**HTTP Request Method:** <span style="color: gray;">POST</span> \
<span style="font-style: italic">Request Body:</span>
```json
  {
    "description": <DESC>,
    "image": <IMG>
  }
```
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    {
      "id": <ID>,
      "description": <DESC>,
      "image": <IMG>,
      "createdAt": <DATE>
    }
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "Description And Image Fields Are Null! Fill One Field At Least"
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Get All Posts</span> \
**Endpoint (URL):** /api/v1/posts \
**HTTP Request Method:** <span style="color: gray;">GET</span> \
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    "posts": [
      {
        "id": <ID1>,
        "description": <DESC>,
        "image": <IMG>,
        "createdAt": <DATE>
      },
      {
        "id": <ID2>,
        "description": <DESC>,
        "image": <IMG>,
        "createdAt": <DATE>
      }
    ]
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Get Post</span> \
**Endpoint (URL):** /api/v1/posts/:id \
**HTTP Request Method:** <span style="color: gray;">GET</span> \
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    {
      "id": <ID>,
      "description": <DESC>,
      "image": <IMG>,
      "createdAt": <DATE>
    }
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "Fill One Field At Least"
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Update Post</span> \
**Endpoint (URL):** /api/v1/posts/:id \
**HTTP Request Method:** <span style="color: gray;">PUT</span> \
<span style="font-style: italic">Request Body:</span>
```json
  {
    "description": <DESC>,
    "image": <IMG>
  }
```
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    {
      "id": <ID>,
      "description": <DESC>,
      "image": <IMG>,
      "createdAt": <DATE>
    }
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "Description And Image Fields Are Null! Fill One Field At Least"
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Delete Post</span> \
**Endpoint (URL):** /api/v1/posts/:id \
**HTTP Request Method:** <span style="color: gray;">DELETE</span> \
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    "message": "Post With ID <ID> Has Been Deleted"
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "There is no Comment With The ID <ID> !"
  }
```


### Comments Api Design 💬

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Add Comment</span> \
**Endpoint (URL):** /api/v1/posts/:id/comments/:id \
**HTTP Request Method:** <span style="color: gray;">POST</span> \
<span style="font-style: italic">Request Body:</span>
```json
  {
    "content": <COMMENT_CONTENT>
  }
```
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    {
      "id": <ID>,
      "content": <COMMENT_CONTENT>,
      "createdAt": <DATE>
    }
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "Content Field Can't be Null! Fill Content Field Please"
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Get All Comments</span> \
**Endpoint (URL):** /api/v1/posts/:id/comments \
**HTTP Request Method:** <span style="color: gray;">GET</span> \
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    "comments": [
      {
        "id": <ID1>,
        "content": <COMMENT_CONTENT>,
        "createdAt": <DATE>
      },
      {
        "id": <ID2>,
        "content": <COMMENT_CONTENT>,
        "createdAt": <DATE>
      }
    ]
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Update Comment</span> \
**Endpoint (URL):** /api/v1/posts/:id/comments/:id \
**HTTP Request Method:** <span style="color: gray;">PUT</span> \
<span style="font-style: italic">Request Body:</span>
```json
  {
    "content": <COMMENT_CONTENT>
  }
```
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    {
      "id": <ID>,
      "content": <COMMENT_CONTENT>,
      "createdAt": <DATE>
    }
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "Fill One Field At Least"
  }
```

<span style="color: gray; font-size: 1.2rem; font-weight: bold">Delete Comment</span> \
**Endpoint (URL):** /api/v1/posts/:id/comments/:id \
**HTTP Request Method:** <span style="color: gray;">DELETE</span> \
<span style="color: green; font-style: italic">Success Response Body:</span>
```json
  {
    "success": "true",
    "message": "Comment With ID <ID> Has Been Deleted"
  }
```
<span style="color: red; font-style: italic">Fail Response Body:</span>
```json
  {
    "success": "false",
    "message": "There is no Comment With The ID <ID> !"
  }
```
