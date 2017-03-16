const url = 'http://localhost/';

export default  {
    title: 'xzq\'s Blog',
    indexShowNum: '4',
    pagerMaxNum: '3',
    indexTitleLength: '30',
    indexContentLength: '150',
    emptyArticleMsg: "暂时没有此分类下的文章~",
    newArticleNum : '5',
    hitArticleNum : '5',
    newArticleTitleNum: '16',
    hitArticleTitleNum: '16',
    url: url,
    api: {
      home: url + 'blogadmin/index.php/Home/'
    },
    staticPath: {
      file: url + 'blogadmin/Public/uploads/'
    }
};
