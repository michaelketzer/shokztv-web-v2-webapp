import React, { ReactElement, useState, useMemo } from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { availableArticlesSelector } from "../../store/selectors/Ui";
import { Pagination, Row, Col, Skeleton } from "antd";
import { useArticleList } from "../../hooks/articlesList";
import classNames from "classnames";
import { resolve } from "styled-jsx/css";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import Divider from "../Divider";
import {Parser} from 'html-to-react'; 
import dayjs from 'dayjs';
import {authorsSelector} from '../../store/selectors/Authors';
import Link from "next/link";
import LoadingImage from "./LoadingImage";
import { articlesSelector } from "../../store/selectors/Articles";
import { motion } from "framer-motion";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
        overflow: hidden;
    }

    .content {
        line-height: 150%;
        font-size: 16px;
    }

    .subTitle {
        font-size: 16px;
        font-weight: normal;
    }

    .imageTitle :global(li) {
        margin-left: 0;
        height: 18px;
    }
`;
//#endregion

const pageSize = 4;
export default function ArticleList(): ReactElement {
    const totalCount = useSelector(availableArticlesSelector).length;
    const [page, setPage] = useState(1);
    const articles = useSelector(articlesSelector);
    const articleIds = useArticleList(page - 1, pageSize);
    const authorEntities = useSelector(authorsSelector);

    return <>
        <Header title={'Artikel > Alle Artikel'} />
        <Divider />

        {articleIds.map((id) => {
            const article = articles[id];
            const author = article && authorEntities[article.author];

            return <React.Fragment key={id}>
                <Row type={'flex'} align={'middle'}>
                    <Col sm={6} xs={24}>
                        <motion.div initial="exit" animate="enter" exit="exit" className={classNames(className, 'imageWrapper')}>
                            <LoadingImage src={article && article.cover} />
                        </motion.div>
                    </Col>
                    <Col offset={1} sm={17} xs={24}>
                        <>
                            {article && <>
                                <Title level={3}>
                                    <Link key={`/article/${article.id}`} href={`/article/${article.id}`}><a>{article.title}</a></Link>
                                    <div className={classNames(className, 'subTitle')}>veröffentlicht am {dayjs.unix(article.created).format('DD.MM.YYYY')} von {author.name}</div>
                                </Title>
                                <Paragraph ellipsis={{rows: 2}} className={classNames(className, 'content')}>
                                    <div>{(new Parser()).parse(article.body)}</div>
                                </Paragraph>
                            </>}

                            {!article && <>
                                <Title level={3}>
                                    <Skeleton active={true} title={{width: '100%'}} paragraph={false} />
                                    <Skeleton active={true} title={false} paragraph={{rows: 1, width: '50%'}} />
                                </Title>
                                <Paragraph ellipsis={{rows: 2}} className={classNames(className, 'content')}>
                                    <div><Skeleton active={true} title={false} paragraph={{rows: 2, width: '100%'}} /></div>
                                </Paragraph>
                            </>}
                        </>
                    </Col>
                </Row>

                <Divider />    
            </React.Fragment>
        })}
        
        <Pagination current={page} onChange={(page) => setPage(page)} total={totalCount} pageSize={pageSize} />

        {styles}
    </>;
}