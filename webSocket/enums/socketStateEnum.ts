const socketStateEnum = Object.freeze({

    /**
     * соединение ещё не установлено
     */
    CONNECTING: 0,

    /**
     * обмен данными
     */
    OPEN: 1,

    /**
     * соединение закрывается
     */
    CLOSING: 2,

    /**
     * соединение закрыто
     */
    CLOSED: 3,
});

export default socketStateEnum;
