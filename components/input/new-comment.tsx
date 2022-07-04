import React, { useRef, useState } from 'react';
import classes from './new-comment.module.css';

function NewComment(props: any) {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailInputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const nameInputRef = useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;
    const commentInputRef = useRef<HTMLTextAreaElement>() as React.MutableRefObject<HTMLTextAreaElement>;

    function sendCommentHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredName = nameInputRef.current?.value;
        const enteredComment = commentInputRef.current?.value;

        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredComment ||
            enteredComment.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }

        props.onAddComment({
            email: enteredEmail,
            name: enteredName,
            text: enteredComment,
        });
    }

    return (
        <form className={classes.form} onSubmit={sendCommentHandler}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your email</label>
                    <input type='email' id='email' ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor='name'>Your name</label>
                    <input type='text' id='name' ref={nameInputRef} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor='comment'>Your comment</label>
                <textarea id='comment' rows={3} ref={commentInputRef}></textarea>
            </div>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button>Submit</button>
        </form>
    );
}

export default NewComment;
