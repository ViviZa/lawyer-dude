import React from 'react';
import Startpage from './Startpage';
import Storypage from './Storypage';
import Decisionpage from './Decisionpage';
import Jailpage from './Jailpage';


export const getCurrentPage = (currentPage, onSetUsername, onSetNewPage) => {
        let reactPage;

        if (currentPage.pageType === "StartPage")  {
            reactPage = <Startpage setUserName={onSetUsername} goToNextPage={onSetNewPage} headline={currentPage.headline} panels={currentPage.panels} nextPage={currentPage.nextPage}/> ;

        } else if (currentPage.pageType === "StoryPage") {
             reactPage = <Storypage goToNextPage={onSetNewPage} headline={currentPage.headline} panels={currentPage.panels} nextPage={currentPage.nextPage}/>;

        } else if (currentPage.pageType === "DecisionPage") {
                       reactPage = <Decisionpage panels={currentPage.panels}/>;

        } else if (currentPage.pageType === "JailPage") {
                        reactPage = <Jailpage headline={currentPage.headline} text={currentPage.text}/>;
         }

        return reactPage;
};