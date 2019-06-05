import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';

class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      nextPageID: 0,
      nextPage: '',
      submitted: false,
      imgUrl: '',
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.changeImgUrl = this.changeImgUrl.bind(this);
    this.appendExtImage = this.appendExtImage.bind(this);
  }

  componentDidMount() {
    const { ID } = this.props.location.state;
    const { addingPages } = this.props;
    addingPages(ID);
    const dataString = JSON.stringify(data);
    let jsonData = JSON.parse(dataString);
    const filteredJSON = jsonData.filter(values => values.id === ID);
    const nextPageID = filteredJSON[0].nextPageIDs[0];
    this.setState({
      headline: filteredJSON[0].headline,
      nextPage: filteredJSON[0].nextPage,
      nextPageID: nextPageID,
    })
  }

  changeImgUrl(event) {
    this.setState({ imgUrl: event.target.value, submitted: false })
}

appendExtImage(event) {
    event.preventDefault();
    this.setState({ submitted: true })
}


  redirectToNextPage() {
    const { history } = this.props;
    const { nextPageID, nextPage } = this.state;
    history.push({
      pathname: nextPage,
      state: { ID: nextPageID },
    });
  }

  render() {
    const { ID } = this.props.location.state;

    let { imgUrl, submitted } = this.state;
    let imgView;
    if (submitted) {
        // TODO resize external image
        // TODO is it a valid image url?
        imgView = (<img src={imgUrl} className='imageContent' alt={imgUrl} />);
    } else {
        imgView = (<div className="previewText">Please submit an image URL.</div>);
    }


    return (
      <div className="MatchTheLicense">
         <SideNavigation ID={ID}/>
        <div className="pagecontent">
          <h1>
         Using the Picture
          </h1>
          <form onSubmit={(event) => this.appendExtImage(event)}>
            <label>
                Paste an image URL here:
                <input type="text" value={imgUrl} onChange={this.changeImgUrl} />
            </label>
            <input type="submit" value="Load image" />
        </form>
        <div className="imgView">
            {imgView}
        </div>
        </div>
        <p></p>
        <BackButtonInactive/>
        <ForthButton nextText={this.redirectToNextPage} />
        </div>
    );
  }
}

export default withRouter(MatchTheLicense);
