import React from 'react';
import {Alert} from "react-bootstrap";

export default function InDevelopingAlert() {
    return (
        <Alert variant="warning">
            <Alert.Heading>Страница в разработке</Alert.Heading>
            <p>
                Извините за это безобразие! Обновление займет некоторое время, но не
                переживайте - мы скоро будем с вами. Вы сможете сделать заказ на
                нашем сайте снова с 24 апреля. Первые 20 посетителей, которые
                обратятся к нам, получат футболку из нашей новой коллекции! А пока
                ознакомьтесь с нашими продуктами в Instagram
            </p>
        </Alert>
    );
}

//https://senior.ua/articles/kak-napisat-tekst-sayta-v-razrabotke-s-primerami
