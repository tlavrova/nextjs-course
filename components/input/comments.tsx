import {useEffect, useState} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import {any} from "prop-types";

function Comments(props: {eventId: string}) {
    const { eventId } = props;
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<any>([])

    useEffect(() => {
        if (showComments) {
            fetch('/api/comments/' + eventId)
                .then(response => response.json())
                .then(data => {
                    setComments(data.comments)
                })
        }
    }, [showComments])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus);
    }

    function addCommentHandler(commentData: {email: string, name:string, text: string}) {
        fetch('/api/comments/' + eventId, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => console.log(data))
    }

    // @ts-ignore
    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentList items={comments} />}
        </section>
    );
}

export default Comments;
