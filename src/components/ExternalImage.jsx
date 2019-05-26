import React, { Component } from 'react';

class ExternalImage extends Component {

    changeImgUrl(event) {
        this.setState({ imgUrl: event.target.value })
    }

    appendExtImage(event) {
        event.preventDefault();
        this.setState({ imgUrl: event.target.value })

        return (
            <div id="externalImage">
                <img src={this.props.imgUrl} alt="externalImage" />
            </div>
        )
    }

    render() {

        let {imgUrl} = this.state;
        let $imgView = null;
        if (imgUrl) {
            // TODO resize external image
            $imgView = (<img src={imgUrl} className={'img-view'} />);
        } else {
            $imgView = (<div className="previewText">Please submit an image URL.</div>);
        }

        return (

            <div>
                <form onSubmit={(event) => this.appendExtImage(event)}>
                    <label>
                        Paste your image URL here:
                        <input type="text" value={this.state.imgUrl} onChange={this.changeImgUrl} />
                    </label>
                    <input type="submit" value="Load image" />
                </form>
                <p></p>
                <div className="imgView">
                    {$imgView}
                </div>
            </div>

        );
    }
}

export default ExternalImage;