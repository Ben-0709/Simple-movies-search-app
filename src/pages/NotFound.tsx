import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className={'container'}>
            <h1>Not found</h1>
            <Link className={'notFoundLink'} to={'/'}>
                Go Home
            </Link>
        </div>
    );
}

export default NotFound;