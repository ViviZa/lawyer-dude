import React from 'react';
import Startpage from './Startpage';
import Storypage from './Storypage';
import Decisionpage from './Decisionpage';
import Jailpage from './Jailpage';


export const getCurrentPage = (currentPage) => {
        let reactPage;

        if (currentPage.pageType === "StartPage")  {
            reactPage = <Startpage headline={currentPage.headline} text={currentPage.text}/> ;

        } else if (currentPage.pageType === "StoryPage") {
             reactPage = <Storypage headline={currentPage.headline} text={currentPage.text}/>;

        } else if (currentPage.pageType === "DecisionPage") {
                       reactPage = <Decisionpage text={currentPage.text}/>;

        } else if (currentPage.pageType === "JailPage") {
                        reactPage = <Jailpage headline={currentPage.headline} text={currentPage.text}/>;
         }

        return reactPage;
};