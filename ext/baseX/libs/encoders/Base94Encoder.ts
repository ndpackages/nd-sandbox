import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import AbstractBaseXEncoder from "./AbstractBaseXEncoder";
import AlphabetEnum from "../../enums/AlphabetEnum";

export default class Base94Encoder extends AbstractBaseXEncoder implements EncoderInterface {

    alphabet = AlphabetEnum.BASE_94;

}
