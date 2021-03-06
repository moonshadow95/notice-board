import {db} from "../db/database.js";

const SELECT_JOIN = 'SELECT shops.id, shops.title, shops.address, shops.date, shops.coords, shops.phone, shops.userId, users.username FROM shops JOIN users ON shops.userId=users.id'
const ORDER_DESC = 'ORDER BY shops.date DESC'

export async function getShopsAll() {
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
        .then(result => result[0])
}

export async function getReviews() {
    return db
        .execute(`${SELECT_JOIN} ${ORDER_DESC}`)
        .then(result => result[0])
}


export async function getReviewsAll(id) {
    if (id) {
        return db
            .execute(`SELECT rv.id, rv.text, rv.userId, rv.date, rv.rate, rv.shopId, users.username FROM reviews as rv LEFT JOIN shops as sh ON sh.id=rv.shopId JOIN users ON rv.userId=users.id WHERE rv.shopId=${id} ORDER BY rv.date DESC`)
            .then(result => result[0])
    } else {
        return db
            .execute(`SELECT rv.id, rv.text, rv.userId, rv.date, rv.rate, rv.shopId, users.username FROM reviews as rv LEFT JOIN shops as sh ON sh.id=rv.shopId JOIN users ON rv.userId=users.id ORDER BY rv.date DESC`)
            .then(result => result[0])
    }
}

export async function getShopsById(id) {
    return db
        .execute(`${SELECT_JOIN} WHERE shops.id=${id}`)
        .then(result => result[0][0])
}

export async function getReviewById(id) {
    return db
        .execute(`SELECT * FROM reviews WHERE reviews.id=${id}`)
        .then(result => result[0][0])
}

export async function update(id, title, rate, text, coords) {
    return db
        .execute(`UPDATE shops SET title=?,rate=?,coords=? WHERE shops.id=?`, [title.replaceAll('</p><p>', ''), rate, coords, id])
        .then(() => getShopsById(id))
}

export async function create(id, title, address, phone, coords, userId) {
    return db
        .execute("INSERT INTO shops (id,title,address,phone,coords,userId) VALUES (?,?,?,?,?,?)", [id, title.replaceAll('</p><p>', ''), address, phone, coords, userId])
        .then(result => getShopsById(result[0].insertId))
}

export async function createReview(text, userId, id, rate) {
    return db
        .execute("INSERT INTO reviews (text,userId,shopId,rate) VALUES (?,?,?,?)", [text.replaceAll('</p><p>', ''), userId, id, rate])
        .then(result => getShopsById(result[0].insertId))
}

export async function remove(id) {
    return db.execute("DELETE FROM shops WHERE id=?", [id])
}

export async function removeReview(id) {
    return db.execute("DELETE FROM reviews WHERE id=?", [id])
}

export async function removeReviewByShopId(id) {
    return db.execute("DELETE FROM reviews WHERE shopId=?", [id])
}