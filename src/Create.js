import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [author,setAuthor] = useState('mario');
    const [isPending,setIsPending] = useState(false);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title , body , author};

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(blog)
        }).then(() => {
            setIsPending(false);
            history.push('/');
        })
       
    }

    return ( 
        <div className="create">
            <form onSubmit={handleSubmit}>
            <h2> Add new Blog </h2>
            <label>Blog Name:</label>
            <input 
                type="text"
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value) }
            />
            <label>Blog Body:</label>
            <textarea
                required 
                value={body}
                onChange={(e) => setBody(e.target.value) }
            />
            <label>Blog Author:</label>
            <select 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            >
                <option value="mario">Mario</option>
                <option value="yoshi">Yoshi</option>
            </select>
             {!isPending && <button>Add Blog</button> }
             {isPending && <button disabled>Adding</button> }

            </form>
        </div>
     );
}
export default Create;