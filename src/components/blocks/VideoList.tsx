import React, { ReactElement, useState, useMemo } from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { availableVideosSelector } from "../../store/selectors/Ui";
import { Pagination, Row, Col } from "antd";
import classNames from "classnames";
import { resolve } from "styled-jsx/css";
import Divider from "../Divider";
import { useVideoList } from "../../hooks/videoList";
import LoadingImage from "./LoadingImage";
import { videoEntitiesSelector } from "../../store/selectors/Videos";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        padding-bottom: 56.2%;
        position: relative;
        overflow: hidden;
    }
`;
//#endregion

const pageSize = 12;
export default function VideoList(): ReactElement {
    const totalCount = useSelector(availableVideosSelector).length;
    const videos = useSelector(videoEntitiesSelector);
    const [page, setPage] = useState(1);
    const videoIds = useVideoList(page - 1, pageSize);

    return <>
        <Header title={'Videos > Alle Videos'} />
        <Divider />

        <Row type={'flex'} justify={'end'}>
            <Pagination current={page} onChange={(page) => setPage(page)} total={totalCount} pageSize={pageSize} />
        </Row>

        <br />

        <Row type={'flex'} align={'middle'} gutter={[25, 25]}>
            {videoIds.map((videoId) => {
                const video = videos[videoId];
                return <Col sm={8} xs={24} key={videoId}>
                    <div className={classNames(className, 'imageWrapper')}>
                        <LoadingImage src={video && video.thumbnail} />
                    </div>
                </Col>
            })}
        </Row>

        {styles}
    </>;
}