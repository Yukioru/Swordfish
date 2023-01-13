/**
 * Based on https://github.com/tinganho/node-accept-language/blob/master/Source/AcceptLanguage.ts
 * Improved with non-deprecated & most updated libraries
 */

import { Schema, parse } from 'bcp-47';

interface LanguageTagWithValue extends Schema {
  value: string;
}

interface LanguageScore {
  unmatchedRequestedSubTag: number;
  quality: number;
  languageTag: string;
}

class AcceptLanguage {
  private languageTagsWithValues: {
    [language: string]: [LanguageTagWithValue];
  } = {};

  private defaultLanguageTag: string | null = null;

  public languages(definedLanguages: string[]) {
    if (definedLanguages.length < 1) {
      throw new Error(
        'The number of defined languages cannot be smaller than one.'
      );
    }

    this.languageTagsWithValues = {};
    definedLanguages.forEach((languageTagString) => {
      const languageTag = parse(languageTagString);
      if (!languageTag) {
        throw new TypeError(
          'Language tag ' +
            languageTagString +
            ' is not bcp47 compliant. For more info https://tools.ietf.org/html/bcp47.'
        );
      }
      const language = languageTag.language;
      if (!language) {
        throw new TypeError(
          'Language tag ' + languageTagString + ' is not supported.'
        );
      }
      let languageTagWithValues: LanguageTagWithValue =
        languageTag as LanguageTagWithValue;
      languageTagWithValues.value = languageTagString;
      const lowerCasedLanguageTagWithValues: LanguageTagWithValue = {
        language: language.toLowerCase(),
        extendedLanguageSubtags: languageTag.extendedLanguageSubtags.map((e) =>
          e.toLowerCase()
        ),
        region: languageTag.region && languageTag.region.toLowerCase(),
        script: languageTag.script && languageTag.script.toLowerCase(),
        variants: languageTag.variants.map((v) => v.toLowerCase()),
        privateuse: languageTag.privateuse.map((p) => p.toLowerCase()),
        extensions: languageTag.extensions.map((e) => {
          return {
            extensions:
              e.extensions && e.extensions.map((e) => e.toLowerCase()),
            singleton: e.singleton.toLowerCase(),
          };
        }),
        irregular: languageTag.irregular && languageTag.irregular.toLowerCase(),
        regular: languageTag.regular && languageTag.regular.toLowerCase(),
        value: languageTagString,
      };
      if (!this.languageTagsWithValues[language]) {
        this.languageTagsWithValues[language] = [
          lowerCasedLanguageTagWithValues,
        ];
      } else {
        this.languageTagsWithValues[language].push(
          lowerCasedLanguageTagWithValues
        );
      }
    });

    this.defaultLanguageTag = definedLanguages[0];
  }

  public get(languagePriorityList: string | null | undefined): string | null {
    return this.parse(languagePriorityList)[0];
  }

  public create(): this {
    return null as any;
  }

  private parse(
    languagePriorityList: string | null | undefined
  ): (string | null)[] {
    if (!languagePriorityList) {
      return [this.defaultLanguageTag];
    }
    const parsedAndSortedLanguageTags =
      parseAndSortLanguageTags(languagePriorityList);
    const result: LanguageScore[] = [];
    for (const languageTag of parsedAndSortedLanguageTags) {
      const requestedLang = parse(languageTag.tag);

      if (!requestedLang) {
        continue;
      }

      const requestedLangTag = requestedLang;
      if (
        !this.languageTagsWithValues.hasOwnProperty(requestedLangTag.language!)
      ) {
        continue;
      }

      middle: for (const definedLangTag of this.languageTagsWithValues[
        requestedLangTag.language!
      ]) {
        let unmatchedRequestedSubTag = 0;
        for (const prop of [
          'privateuse',
          'extension',
          'variant',
          'region',
          'script',
        ]) {
          const definedLanguagePropertValue = (definedLangTag as any)[prop];
          if (!definedLanguagePropertValue) {
            const requestedLanguagePropertyValue = (requestedLangTag as any)[
              prop
            ];
            if (requestedLanguagePropertyValue) {
              unmatchedRequestedSubTag++;
            }
            switch (prop) {
              case 'privateuse':
              case 'variants':
                for (
                  let i = 0;
                  i < requestedLanguagePropertyValue.length;
                  i++
                ) {
                  if (requestedLanguagePropertyValue[i]) {
                    unmatchedRequestedSubTag++;
                  }
                }
                break;
              case 'extensions':
                for (
                  let i = 0;
                  i < requestedLanguagePropertyValue.length;
                  i++
                ) {
                  const extensions =
                    requestedLanguagePropertyValue[i].extensions;
                  for (let ei = 0; ei < extensions.length; ei++) {
                    if (!requestedLanguagePropertyValue[i].extension[ei]) {
                      unmatchedRequestedSubTag++;
                    }
                  }
                }
                break;
            }
            continue;
          }

          // Filter out wider requested languages first. If someone requests 'zh'
          // and my defined language is 'zh-Hant'. I cannot match 'zh-Hant', because
          // 'zh' is wider than 'zh-Hant'.
          const requestedLanguagePropertyValue = (requestedLangTag as any)[
            prop
          ];
          if (!requestedLanguagePropertyValue) {
            continue middle;
          }

          switch (prop) {
            case 'privateuse':
            case 'variants':
              for (let i = 0; i < definedLanguagePropertValue.length; i++) {
                if (
                  !requestedLanguagePropertyValue[i] ||
                  definedLanguagePropertValue[i] !==
                    requestedLanguagePropertyValue[i].toLowerCase()
                ) {
                  continue middle;
                }
              }
              break;
            case 'extensions':
              for (let i = 0; i < definedLanguagePropertValue.length; i++) {
                const extensions = definedLanguagePropertValue[i].extensions;
                for (let ei = 0; ei < extensions.length; ei++) {
                  if (!requestedLanguagePropertyValue[i]) {
                    continue middle;
                  }
                  if (!requestedLanguagePropertyValue[i].extensions[ei]) {
                    continue middle;
                  }
                  if (
                    extensions[ei] !==
                    requestedLanguagePropertyValue[i].extension[
                      ei
                    ].toLowerCase()
                  ) {
                    continue middle;
                  }
                }
              }
              break;
            default:
              if (
                definedLanguagePropertValue !==
                requestedLanguagePropertyValue.toLowerCase()
              ) {
                continue middle;
              }
          }
        }

        result.push({
          unmatchedRequestedSubTag,
          quality: languageTag.quality,
          languageTag: definedLangTag.value,
        });
      }
    }

    return result.length > 0
      ? result
          .sort((a, b) => {
            const quality: number = b.quality - a.quality;
            if (quality != 0) {
              return quality;
            }
            return a.unmatchedRequestedSubTag - b.unmatchedRequestedSubTag;
          })
          .map((l) => l.languageTag)
      : [this.defaultLanguageTag];

    function parseAndSortLanguageTags(languagePriorityList: string) {
      return (
        languagePriorityList
          .split(',')
          .map((weightedLanguageRange) => {
            const components = weightedLanguageRange
              .replace(/\s+/, '')
              .split(';');
            return {
              tag: components[0],
              quality: components[1]
                ? parseFloat(components[1].split('=')[1])
                : 1.0,
            };
          })

          // Filter non-defined language tags
          .filter((languageTag) => {
            if (!languageTag) {
              return false;
            }
            if (!languageTag.tag) {
              return false;
            }
            return languageTag;
          })
      );
    }
  }
}

function create() {
  const al = new AcceptLanguage();
  al.create = function () {
    return new AcceptLanguage();
  };
  return al;
}

export default create();
