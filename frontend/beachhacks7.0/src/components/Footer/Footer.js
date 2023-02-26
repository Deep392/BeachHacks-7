const Footer = () => {
    return(
        <footer className="footer items-center p-5 bg-neutral text-neutral-content fixed bottom-0">
            <div className="items-center grid-flow-col">
                <p>BLOG © 2023 - All right reserved</p>
            </div>
            <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a className="link link-hover">Privacy</a>
                <a className="link link-hover">Support</a>
                <a className="link link-hover">Terms of Service</a>
            </div>
        </footer>
    )
}

export default Footer;