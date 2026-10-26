import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userData: null,
    isLoggedIn: false,
    posts: null,
    anotherUserProfileData: {},
    anotherUserPostsData: [],
    users: null,
    username: '',
    openCommentSection: false,
    comments: null,
    currentPostData: null,
    createPost: false,
    userProfilePostsAndStats: {
        userPosts: [],
        userFollowers: [],
        userFollowing: []
    },
    openNotification: false,
    madeChanges: 0,
    madeSavedChanges: 0,
    statsChanges: 0
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setAnotherUserProfileData: (state, action) => {
            state.anotherUserProfileData = action.payload;
        }
        ,
        setAnotherUserPostsData: (state, action) => {
            state.anotherUserPostsData = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        }
        ,
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setActivity: (state, action) => {
            state.activity = action.payload;
        },
        setOpenCommentSection: (state, action) => {
            state.openCommentSection = action.payload;
        },
        setComments: (state, action) => {
            state.comments = action.payload
        }
        ,
        setCurrentPostData: (state, action) => {
            state.currentPostData = action.payload;
        },
        setCreatePost: (state, action) => {
            state.createPost = action.payload
        },
        setUserProfilePostsAndStats: (state, action) => {
            state.userProfilePostsAndStats = action.payload
        },
        setOpenNotification: (state, action) => {
            state.openNotification = !state.openNotification
        },
        setMadeChanges: (state, action) => {
            state.madeChanges = state.madeChanges + 1
        },
        setMadeSavedChanges: (state, action) => {
            state.madeSavedChanges = state.madeSavedChanges + 1
        },
        setStatsChanges: (state, action) => {
            state.statsChanges = state.statsChanges + 1
        }
    }
})

export const { setUserData, setIsLoggedIn, setPosts, setAnotherUserProfileData, setAnotherUserPostsData, setUsername, setUsers, setActivity, setOpenCommentSection, setComments, setCurrentPostData, setCreatePost, setUserProfilePostsAndStats, setOpenNotification, setMadeChanges, setMadeSavedChanges, setStatsChanges } = userSlice.actions;
export default userSlice.reducer;