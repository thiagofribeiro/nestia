import { back_inserter, randint } from "tstl";
import { sample as _Sample } from "tstl/ranges";

/**
 * Random data generator.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export namespace RandomGenerator {
    /* ----------------------------------------------------------------
        IDENTIFICATIONS
    ---------------------------------------------------------------- */
    const CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
    const LETTERS: string = "0123456789" + CHARACTERS;

    /**
     * Generate random alphabets
     *
     * @param length Length of alphabets
     * @returns Generated alphabets
     */
    export function alphabets(length: number): string {
        return new Array(length)
            .fill("")
            .map(() => CHARACTERS[randint(0, CHARACTERS.length - 1)])
            .join("");
    }

    /**
     * Generate random alpha-numeric characters.
     *
     * Generate random string constructed with only alphabets and numbers.
     *
     * @param length Length of characters
     * @returns Generated string
     */
    export function alphaNumeric(length: number): string {
        return new Array(length)
            .fill("")
            .map(() => LETTERS[randint(0, LETTERS.length - 1)])
            .join("");
    }

    /**
     * Generate random name.
     *
     * @param length Length of paragraph, default is 2 or 3
     * @returns Generated name
     */
    export function name(length: number = randint(2, 3)): string {
        return paragraph(length)();
    }

    /**
     * Generate random paragraph.
     *
     * @param sentences Number of sentences
     * @returns Paragraph generator
     */
    export const paragraph =
        (sentences: number = randint(2, 5)) =>
        /**
         * @param wordMin Minimum number of characters in a sentence
         * @param wordMax Maximum number of characters in a sentence
         * @returns Generated paragraph
         */
        (wordMin: number = 3, wordMax: number = 7): string =>
            new Array(sentences)
                .fill("")
                .map(() => alphabets(randint(wordMin, wordMax)))
                .join(" ");

    /**
     * Generate random content.
     *
     * @param paragraphes Number of paragraphes
     * @returns Currying function
     */
    export const content =
        (paragraphes: number = randint(3, 8)) =>
        /**
         * @param sentenceMin Minimum number of sentences in a paragraph
         * @param sentenceMax Maximum number of sentences in a paragraph
         * @returns Currying function
         */
        (sentenceMin: number = 10, sentenceMax: number = 40) =>
        /**
         * @param wordMin Minimum number of characters in a sentence
         * @param wordMax Maximum number of characters in a sentence
         * @returns Content generator
         */
        (wordMin: number = 1, wordMax: number = 7): string =>
            new Array(paragraphes)
                .fill("")
                .map(() =>
                    paragraph(randint(sentenceMin, sentenceMax))(
                        wordMin,
                        wordMax,
                    ),
                )
                .join("\n\n");

    /**
     * Generate random substring.
     *
     * @param content Target content
     * @returns Random substring
     */
    export function substring(content: string): string {
        const first: number = randint(0, content.length - 1);
        const last: number = randint(first + 1, content.length);

        return content.substring(first, last).trim();
    }

    /**
     * Generate random mobile number.
     *
     * @param prefix Prefix string, default is "010"
     * @returns Random mobile number
     */
    export function mobile(prefix: string = "010"): string {
        return `${prefix}${digit(3, 4)}${digit(4, 4)}`;
    }

    /**
     * Generate random digit.
     *
     * Generate random digit that filling front with zero characters
     * when value is less than maximum cipher.
     *
     * @param minC Minimum cipher
     * @param maxC Maximum cipher
     * @returns
     */
    export function digit(minC: number, maxC: number): string {
        const val: number = randint(0, Math.pow(10.0, maxC) - 1);
        const log10: number = val ? Math.floor(Math.log10(val)) + 1 : 0;
        const prefix: string = "0".repeat(Math.max(0, minC - log10));

        return prefix + val.toString();
    }

    /**
     * Generate random date.
     *
     * @param from Start date
     * @param range Range of random milliseconds
     * @returns Random date
     */
    export function date(from: Date, range: number): Date {
        const time: number = from.getTime() + randint(0, range);
        return new Date(time);
    }

    /**
     * Pick random elements from an array.
     *
     * @param array Target array
     * @param count Number of count to pick
     * @returns Sampled array
     */
    export function sample<T>(array: T[], count: number): T[] {
        const ret: T[] = [];
        _Sample(array, back_inserter(ret), count);
        return ret;
    }

    /**
     * Pick random element from an array.
     *
     * @param array Target array
     * @returns picked element
     */
    export function pick<T>(array: T[]): T {
        return array[randint(0, array.length - 1)];
    }
}
