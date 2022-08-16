import logo from '../assets/GitHub-Mark-Light-32px.png';

// The allowed usage of GitHub's logos are described here: https://github.com/logos
// As of 08/15/2022, this use case is covered under:
// - Use the Invertocat logo as a social button to link to your GitHub profile or project.

export function GitHubLink() {
  return (
    <div className="align-self-end pt-3 pr-3">
      <a
        href="https://github.com/lemartin19/hardware-simulator"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="GitHub Logo" src={logo}></img>
      </a>
    </div>
  );
}
GitHubLink.displayName = 'GitHubLink';
