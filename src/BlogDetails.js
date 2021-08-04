import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch';

const BlogDetails = () => {

    const { id } = useParams();
    const { data:blog, error , isPending} = useFetch('https://dojo-app-react.herokuapp.com/api'+ id);
    const history = useHistory();

    const deleteHandle = () => {
        fetch('https://dojo-app-react.herokuapp.com/api'+ blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
       
    }
    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p><strong>Written by:</strong> {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={deleteHandle}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;