import { useState } from "react";
import { api } from "../config/axios";
import { toast } from "react-toastify";
import { setComments, setMadeChanges, setMadeSavedChanges, setPosts } from "../redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const useDeletion = () => {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const currentPostData = useSelector(state => state.currentPostData);

    
    const [loading, setLoading] = useState(false);
    const [editText, setEditText] = useState(null);
    const [isEditCommentOpen, setIsEditCommentOpen] = useState(false);

    const [id, setId] = useState(null);

    const onOpen = (id) => {
        setId(id)
        setIsOpen(true);

    };

    const onClose = () => {
        setId(null);
        setIsOpen(false)
    };


    const oneditCommentOpen = (id, comment) => {
        setIsEditCommentOpen(true);
        setEditText(comment);
        setId(id)
    }

    const setNewEditedText = (e) => {
        setEditText(e.target.value);
    }

    const onCommentDelete = async (_id = null) => {

        setLoading(true);
        try {
            const res = await api.delete(`/comment/delete-post-comment?id=${_id || id}`);
            if (res.status === 200) {
                try {
                    const res = await api.get(`/post/get-post-comments?postId=${currentPostData?._id}`);
                    if (res.status === 200) {
                        dispatch(setComments(res?.data?.comments));
                    }
                }
                catch (err) {
                    toast.error('something went wrong ! please try again');
                    return;
                }
            }
        }
        catch (err) {
            toast.error('something went wrong ! please try again');

        }
        finally {
            setLoading(false);
            setIsOpen(false);
            setId(null);

        }
    }


    const onPostDelete = async (postId = null) => {
        setLoading(true)
        try {
            const res = await api.delete(`/post/delete?id=${postId || id}`);
            if (res.status === 200) {
                toast.success('your post is deleted.');
                dispatch(setMadeChanges());
                dispatch(setMadeSavedChanges());

            }
        }
        catch (err) {
            toast.error('something went wrong! please try again.');
        }
        finally {
            setLoading(false);
            setIsOpen(false);
            setId(null);
           
        }
    }

    const onEditSave = async (comment) => {
        setLoading(true);
        try {
            const res = await api.patch('/comment/edit-post-comment', { editedComment: comment, id });
            if (res.status === 201) {
                try {
                    const res = await api.get(`/post/get-post-comments?postId=${currentPostData?._id}`);
                    if (res.status === 200) {
                        dispatch(setComments(res?.data?.comments));
                        return true;
                    }
                }
                catch (err) {
                    toast.error('something went wrong ! please try again');
                    return;
                }
            }
        }
        catch (err) {
            toast.error('something went wrong ! please try again');
        }
        finally {
            setLoading(false);
            setIsEditCommentOpen(false);
        }
    }

    const onEditCommentClose = () => {
        setIsEditCommentOpen(false);
        setId(null);
    }

    return { isOpen, onOpen, onClose, oneditCommentOpen, isEditCommentOpen, loading, onCommentDelete, onPostDelete, editText, setNewEditedText, onEditCommentClose, onEditSave }

}