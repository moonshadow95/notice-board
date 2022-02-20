import React, {useCallback, useEffect, useState} from 'react';
import BoardItem from "./BoardItem";
import TextEditor from "../TextEditor/TextEditor";
import Paging from "../Paging/Paging";
import {useNavigate} from "react-router-dom";
import SearchPlace from "../Map/SearchPlace";

const Board = ({user, authService, boardService, setBanner, setIsAlert}) => {
    const [isAuth, setIsAuth] = useState(undefined)
    const [writing, setWriting] = useState(false)
    const [viewContent, setViewContent] = useState([])
    const [titleAndCoords, setTitleAndCoords] = useState([])
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('');
    const [placeObj, setPlaceObj] = useState()
    const navigate = useNavigate()
    const isShops = window.location.href.includes('shops')
    const itemsPerPage = 8
    const onWriteClick = () => {
        setKeyword('')
        setWriting(prev => !prev)
    }
    const pagination = (array, page, itemsPerPage) =>
        array.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)

    // 게시판 가져오기
    const getBoards = useCallback(async () => {
        const response = await boardService.getBoard()
        if (isShops) {
            const data = response.map(item => {
                const titles = item.title;
                const coords = item.coords.split(',');
                return {title: titles, coords: coords.map(item => parseFloat(item))}
            })
            setTitleAndCoords([...data])
        }
        return setViewContent(prev => [...response])
    }, [boardService, isShops])

    useEffect(() => {
        getBoards()
        setIsAuth(prev => user)
    }, [getBoards, user])

    // 로그인 확인
    useEffect(() => {
        authService.me().catch(err => navigate('/'))
    }, [authService, navigate])

    return (
        <main
            className={`flex-col-center mt-[100px] ${isShops && 'lg:flex-row gap-6'}`}
        >
            {isShops &&
            <SearchPlace
                boardService={boardService}
                getBoards={getBoards}
                keyword={keyword}
                setKeyword={setKeyword}
                setPlaceObj={setPlaceObj}
                titleAndCoords={titleAndCoords}
                setIsAlert={setIsAlert}
                setBanner={setBanner}
            />}
            <section
                className='flex-col-center max-w-[700px] md:min-w-[500px] gap-8 basis-1/2 m-auto'
            >
                <header className='flex-col-center text-center'>
                    <h1 className='title'>{isShops ? '등록된 맛집' : '간식 신청 게시판'}</h1>
                    <span>{isShops ? '키워드로 검색 후 결과 목록에서 클릭해주세요.' : '원하는 간식을 신청하세요.'}</span>
                </header>
                <>
                    <ul
                        className='flex flex-col bg-white gap-4'
                    >
                        {pagination(viewContent, page, itemsPerPage).map((content, index) =>
                            <li key={index}
                                className='flex w-full border rounded shadow-lg item-animation'
                            >
                                <BoardItem content={content}/>
                            </li>
                        )}
                    </ul>
                    {isShops || (writing ?
                            <TextEditor
                                isEdit={false}
                                onWriteClick={onWriteClick}
                                boardService={boardService}
                                getBoards={getBoards}
                                user={user}
                                setBanner={setBanner}
                                setIsAlert={setIsAlert}
                                keyword={keyword}
                                setKeyword={setKeyword}
                                placeObj={placeObj}
                                setPlaceObj={setPlaceObj}
                            /> :
                            <div>
                                <button onClick={onWriteClick}
                                        className={`${isShops || 'w-full'} text-white bg-black px-4 py-6 border rounded transition active:translate-y-2 hover:text-black hover:bg-white`}
                                >글 작성하기
                                </button>
                            </div>
                    )}
                    <Paging
                        page={page}
                        setPage={setPage}
                        totalCount={viewContent.length}
                        itemsPerPage={itemsPerPage}
                    />
                </>
            </section>
        </main>
    )
};

export default Board;