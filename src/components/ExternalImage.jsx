import React, { Component } from 'react';

class ExternalImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            imgUrl: '',
        };

    this.changeImgUrl = this.changeImgUrl.bind(this);
    this.appendExtImage = this.appendExtImage.bind(this);
    }

    changeImgUrl(event) {
        this.setState({ imgUrl: event.target.value, submitted: false })
    }

    appendExtImage(event) {
        event.preventDefault();
        this.setState({ submitted: true })
    }

    render() {

        let { imgUrl } = this.state;
        let { submitted } = this.state;
        let imgView;
        if (submitted) {
            // TODO resize external image
            // TODO is it a valid image url?
            imgView = (<img src={imgUrl} className='img-view' alt={imgUrl} />);
        } else {
            imgView = (<div className="previewText">Please submit an image URL.</div>);
        }

        return (

            <div>
                <form onSubmit={(event) => this.appendExtImage(event)}>
                    <label>
                        Paste an image URL here:
                        <input type="text" value={imgUrl} onChange={this.changeImgUrl} />
                    </label>
                    <input type="submit" value="Load image" />
                </form>
                <p></p>
                <p></p>
                <p></p>
                <div className="imgView">
                    {imgView}
                </div>
            </div>

        );
    }
}

export default ExternalImage;