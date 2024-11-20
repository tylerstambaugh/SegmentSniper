import styles from "./style.module.scss"

type ErrorPageProps = {
    error?: string | null;
}

const ErrorPage = (props: ErrorPageProps) => {

    return (
        <h1>Oops.  We don't know what happened, but we're looking into it. </h1>
    )
}

export default ErrorPage