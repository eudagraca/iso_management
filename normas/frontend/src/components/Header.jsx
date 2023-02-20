import { useState } from "react";
import Spinner from "./Spinner";

function Header() {
  const [isLoading, setIsLoading] = useState(false);

  const logOut = () => {

    setTimeout(() => {
    setIsLoading(true);
      localStorage.clear();
    }, 6000);

    localStorage.clear();
    setIsLoading(false);
    console.log("DONE");
  };

  return (
    <header className="uk-position-fixed" id="top-head">
      {isLoading ? <Spinner /> : ""}
      <div className="uk-container uk-container-expand uk-background-primary">
        <nav
          className="uk-navbar uk-light"
          data-uk-navbar="mode:click; duration: 250"
        >
          <div className="uk-navbar-left">
            <div className="uk-navbar-item uk-hidden@m">
              <a className="uk-logo" href="/">
                <img className="custom-logo" src="/images/logo.PNG" alt="" />
              </a>
            </div>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li>
                <a
                  onClick={logOut}
                  className="uk-text-white"
                  href="/accounts/login"
                  title="Terminar a sessão"
                  data-uk-tooltip=""
                >
                  Sair <span uk-icon="sign-out"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
