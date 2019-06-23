import React, { Component } from 'react';
import SideNavigation from '../components/SideNavigation';
import { withRouter } from 'react-router';
import data from '../data.json';
import BackButtonInactive from '../components/BackButtonInactive';
import ForthButton from '../components/ForthButton';
import Select from 'react-select';

const options = [
  { value: '1', label: 'CC BY'},
  { value: '2', label: 'CC BY-SA'},
  { value: '3', label: 'CC BY-ND' },
  { value: '4', label: 'CC BY-NC' },
  { value: '5', label: 'CC BY-NC-SA' },
  { value: '6', label: 'CC BY-NC-ND' },
  { value: '7', label: 'CC-0'}
];

class MatchTheLicense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: '',
      nextPageID: 0,
      nextPage: '',
      submitted: false,
      imgUrl: '',
      link: '',
      copywriter: '',
      license: '',
      title: '',
      noticeCreated: false,
    };
    this.redirectToNextPage = this.redirectToNextPage.bind(this);
    this.changeImgUrl = this.changeImgUrl.bind(this);
    this.appendExtImage = this.appendExtImage.bind(this);
    this.createNotice = this.createNotice.bind(this);
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

updateTextFieldValue(event, key) {
  this.setState({ [key]: event.target.value})
}

handleDropdownChange = (license) => {
  this.setState({ license });
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

  createNotice() {
    this.setState({noticeCreated: true});
  }

  render() {
    const { ID } = this.props.location.state;

    let { imgUrl, submitted, link, license, copywriter, title, noticeCreated } = this.state;
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
       <button onClick={() => this.props.history.goBack()}>Go Back</button>
         <SideNavigation ID={ID}/>
        <div className="pagecontent">
          <h1>
         Using the Picture
          </h1>
          {
            !noticeCreated && (
              <form className="url-form" onSubmit={(event) => this.appendExtImage(event)}>
                <label className="url-label">
                    <input className="picture-upload-input" type="text" value={imgUrl} onChange={this.changeImgUrl} />
                    Paste your image URL
                </label>
                <input className="load-img-btn" type="submit" value="Load image" />
            </form>
            )
          }
          <div className="imgView">
              {imgView}
          </div>
         { !noticeCreated ? ( 
        <div>
          <div>
            <div className="licenceProperty-container">
              <input className="picture-specs-input" type="text" value={title} onChange={(ev) => this.updateTextFieldValue(ev, 'title')} />
              <div className="licenceProperty">Title</div>
            </div>
          </div>
          <div>
            <div className="licenceProperty-container">
              <input className="picture-specs-input" type="text" value={link} onChange={(ev) => this.updateTextFieldValue(ev, 'link')} />
              <div className="licenceProperty">Link</div>
            </div>
          </div>
          <div>
            <div className="licenceProperty-container">
              <input className="picture-specs-input" type="text" value={copywriter} onChange={(ev) => this.updateTextFieldValue(ev, 'copywriter')} />
              <div className="licenceProperty">Copywriter</div>
            </div>
          </div>
          <div>
            <div className="selectProperty-container">
              <div className="selectProperty">License</div>
              <div className="license-select-wrap">
                <Select
                      value={license}
                      onChange={this.handleDropdownChange}
                      options={options}
                      className="licenseDropdown"
                  />
              </div>
            </div>
          </div>
          <button className="url-upload-btn" onClick={this.createNotice}>Save</button>
          </div>
          ) : (
            <div>
                <p>{title}</p>
                License: {copywriter}, {license.label},
                <p>{link}</p>
                <BackButtonInactive/>
                <ForthButton nextText={this.redirectToNextPage} />
            </div>
          )
          }
        </div>
        </div>
    );
  }
}

export default withRouter(MatchTheLicense);
