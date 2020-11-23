describe('base64', () => {
  const data: Array<[string, string, string]> = [
    ['', '', ''],
    ['v', 'dg==', 'dg'],
    ['vtils', 'dnRpbHM=', 'dnRpbHM'],
    [
      'vtils.base64Encode',
      'dnRpbHMuYmFzZTY0RW5jb2Rl',
      'dnRpbHMuYmFzZTY0RW5jb2Rl',
    ],
    [
      'JavaScript 工具库',
      'SmF2YVNjcmlwdCDlt6XlhbflupM=',
      'SmF2YVNjcmlwdCDlt6XlhbflupM',
    ],
    [
      'JavaScript\n工具库',
      'SmF2YVNjcmlwdArlt6XlhbflupM=',
      'SmF2YVNjcmlwdArlt6XlhbflupM',
    ],
    ['\0', 'AA==', 'AA'],
    ['1', 'MQ==', 'MQ'],
    ['-1', 'LTE=', 'LTE'],
    [
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#0^&*();:<>,. []{}',
      'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw+LC4gW117fQ==',
      'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkhQCMwXiYqKCk7Ojw-LC4gW117fQ',
    ],
    [
      '😁😎=-#@`.,?/|{*+😁',
      '8J+YgfCfmI49LSNAYC4sPy98eyor8J+YgQ==',
      '8J-YgfCfmI49LSNAYC4sPy98eyor8J-YgQ',
    ],
    [
      '❥(ゝω・✿ฺ)※▓●²♠⑲Ⅲ∵molÇùㄡεətsフぽㅚ㉢д╢┉(๑╹◡╹)ﾉ"""',
      '4p2lKOOCnc+J44O74py/4Li6KeKAu+KWk+KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c+ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI=',
      '4p2lKOOCnc-J44O74py_4Li6KeKAu-KWk-KXj8Ky4pmg4pGy4oWi4oi1bW9sw4fDueOEoc61yZl0c-ODleOBveOFmuOJotC04pWi4pSJKOC5keKVueKXoeKVuSnvvokiIiI',
    ],
    ['f', 'Zg==', 'Zg'],
    ['fo', 'Zm8=', 'Zm8'],
    ['foo', 'Zm9v', 'Zm9v'],
    ['foob', 'Zm9vYg==', 'Zm9vYg'],
    ['fooba', 'Zm9vYmE=', 'Zm9vYmE'],
    ['foobar', 'Zm9vYmFy', 'Zm9vYmFy'],
    [
      '☸☹☺☻☼☾☿\n\n)(<\n\n龘の👺🤖\n\n\u0001\u0002\u0003\u0004\u0005\u0006\u0007\b\t\n\u000b\f\n\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018\u0019\u001a\u001b\u001c\u001d\u001e\u001f !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŉŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžſƀƁƂƃƄƅƆƇƈƉƊƋƌƍƎƏƐƑƒƓƔƕƖƗƘƙƚƛƜƝƞƟƠơƢƣƤƥƦƧƨƩƪƫƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎȏȐȑȒȓȔȕȖȗȘșȚțȜȝȞȟȠȡȢȣȤȥȦȧȨȩȪȫȬȭȮȯȰȱȲȳȴȵȶȷȸȹȺȻȼȽȾȿɀɁɂɃɄɅɆɇɈɉɊɋɌɍɎɏɐɑɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙˚˛˜˝˞˟ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯˰˱˲˳˴˵˶˷˸˹˺˻˼˽˾˿̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚ͅ͏͓͔͕͖͙͚͐͑͒͗͛ͣͤͥͦͧͨͩͪͫͬͭͮͯ͘͜͟͢͝͞͠͡ͰͱͲͳʹ͵Ͷͷ͸͹ͺͻͼͽ;Ϳ΀΁΂΃΄΅Ά·ΈΉΊ΋Ό΍ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ΢ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧ',
      '4pi44pi54pi64pi74pi84pi+4pi/CgopKDwKCum+mOOBrvCfkbrwn6SWCgoBAgMEBQYHCAkKCwwKDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5/woDCgcKCwoPChMKFwobCh8KIwonCisKLwozCjcKOwo/CkMKRwpLCk8KUwpXClsKXwpjCmcKawpvCnMKdwp7Cn8KgwqHCosKjwqTCpcKmwqfCqMKpwqrCq8Kswq3CrsKvwrDCscKywrPCtMK1wrbCt8K4wrnCusK7wrzCvcK+wr/DgMOBw4LDg8OEw4XDhsOHw4jDicOKw4vDjMONw47Dj8OQw5HDksOTw5TDlcOWw5fDmMOZw5rDm8Ocw53DnsOfw6DDocOiw6PDpMOlw6bDp8Oow6nDqsOrw6zDrcOuw6/DsMOxw7LDs8O0w7XDtsO3w7jDucO6w7vDvMO9w77Dv8SAxIHEgsSDxITEhcSGxIfEiMSJxIrEi8SMxI3EjsSPxJDEkcSSxJPElMSVxJbEl8SYxJnEmsSbxJzEncSexJ/EoMShxKLEo8SkxKXEpsSnxKjEqcSqxKvErMStxK7Er8SwxLHEssSzxLTEtcS2xLfEuMS5xLrEu8S8xL3EvsS/xYDFgcWCxYPFhMWFxYbFh8WIxYnFisWLxYzFjcWOxY/FkMWRxZLFk8WUxZXFlsWXxZjFmcWaxZvFnMWdxZ7Fn8WgxaHFosWjxaTFpcWmxafFqMWpxarFq8Wsxa3FrsWvxbDFscWyxbPFtMW1xbbFt8W4xbnFusW7xbzFvcW+xb/GgMaBxoLGg8aExoXGhsaHxojGicaKxovGjMaNxo7Gj8aQxpHGksaTxpTGlcaWxpfGmMaZxprGm8acxp3GnsafxqDGocaixqPGpMalxqbGp8aoxqnGqsarxqzGrcauxq/GsMaxxrLGs8a0xrXGtsa3xrjGuca6xrvGvMa9xr7Gv8eAx4HHgseDx4THhceGx4fHiMeJx4rHi8eMx43HjsePx5DHkceSx5PHlMeVx5bHl8eYx5nHmsebx5zHnceex5/HoMehx6LHo8ekx6XHpsenx6jHqceqx6vHrMetx67Hr8ewx7HHssezx7THtce2x7fHuMe5x7rHu8e8x73Hvse/yIDIgciCyIPIhMiFyIbIh8iIyInIisiLyIzIjciOyI/IkMiRyJLIk8iUyJXIlsiXyJjImciayJvInMidyJ7In8igyKHIosijyKTIpcimyKfIqMipyKrIq8isyK3IrsivyLDIsciyyLPItMi1yLbIt8i4yLnIusi7yLzIvci+yL/JgMmByYLJg8mEyYXJhsmHyYjJicmKyYvJjMmNyY7Jj8mQyZHJksmTyZTJlcmWyZfJmMmZyZrJm8mcyZ3JnsmfyaDJocmiyaPJpMmlyabJp8moyanJqsmryazJrcmuya/JsMmxybLJs8m0ybXJtsm3ybjJucm6ybvJvMm9yb7Jv8qAyoHKgsqDyoTKhcqGyofKiMqJyorKi8qMyo3KjsqPypDKkcqSypPKlMqVypbKl8qYypnKmsqbypzKncqeyp/KoMqhyqLKo8qkyqXKpsqnyqjKqcqqyqvKrMqtyq7Kr8qwyrHKssqzyrTKtcq2yrfKuMq5yrrKu8q8yr3Kvsq/y4DLgcuCy4PLhMuFy4bLh8uIy4nLisuLy4zLjcuOy4/LkMuRy5LLk8uUy5XLlsuXy5jLmcuay5vLnMudy57Ln8ugy6HLosujy6TLpcumy6fLqMupy6rLq8usy63Lrsuvy7DLscuyy7PLtMu1y7bLt8u4y7nLusu7y7zLvcu+y7/MgMyBzILMg8yEzIXMhsyHzIjMicyKzIvMjMyNzI7Mj8yQzJHMksyTzJTMlcyWzJfMmMyZzJrMm8yczJ3MnsyfzKDMocyizKPMpMylzKbMp8yozKnMqsyrzKzMrcyuzK/MsMyxzLLMs8y0zLXMtsy3zLjMucy6zLvMvMy9zL7Mv82AzYHNgs2DzYTNhc2GzYfNiM2JzYrNi82MzY3Njs2PzZDNkc2SzZPNlM2VzZbNl82YzZnNms2bzZzNnc2ezZ/NoM2hzaLNo82kzaXNps2nzajNqc2qzavNrM2tza7Nr82wzbHNss2zzbTNtc22zbfNuM25zbrNu828zb3Nvs2/zoDOgc6CzoPOhM6FzobOh86IzonOis6LzozOjc6Ozo/OkM6RzpLOk86UzpXOls6XzpjOmc6azpvOnM6dzp7On86gzqHOos6jzqTOpc6mzqfOqM6pzqrOq86szq3Ors6vzrDOsc6yzrPOtM61zrbOt864zrnOus67zrzOvc6+zr/PgM+Bz4LPg8+Ez4XPhs+Hz4jPic+Kz4vPjM+Nz47Pj8+Qz5HPks+Tz5TPlc+Wz5fPmM+Zz5rPm8+cz53Pns+fz6DPoc+iz6PPpM+lz6bPpw==',
      '4pi44pi54pi64pi74pi84pi-4pi_CgopKDwKCum-mOOBrvCfkbrwn6SWCgoBAgMEBQYHCAkKCwwKDg8QERITFBUWFxgZGhscHR4fICEiIyQlJicoKSorLC0uLzAxMjM0NTY3ODk6Ozw9Pj9AQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpbXF1eX2BhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ent8fX5_woDCgcKCwoPChMKFwobCh8KIwonCisKLwozCjcKOwo_CkMKRwpLCk8KUwpXClsKXwpjCmcKawpvCnMKdwp7Cn8KgwqHCosKjwqTCpcKmwqfCqMKpwqrCq8Kswq3CrsKvwrDCscKywrPCtMK1wrbCt8K4wrnCusK7wrzCvcK-wr_DgMOBw4LDg8OEw4XDhsOHw4jDicOKw4vDjMONw47Dj8OQw5HDksOTw5TDlcOWw5fDmMOZw5rDm8Ocw53DnsOfw6DDocOiw6PDpMOlw6bDp8Oow6nDqsOrw6zDrcOuw6_DsMOxw7LDs8O0w7XDtsO3w7jDucO6w7vDvMO9w77Dv8SAxIHEgsSDxITEhcSGxIfEiMSJxIrEi8SMxI3EjsSPxJDEkcSSxJPElMSVxJbEl8SYxJnEmsSbxJzEncSexJ_EoMShxKLEo8SkxKXEpsSnxKjEqcSqxKvErMStxK7Er8SwxLHEssSzxLTEtcS2xLfEuMS5xLrEu8S8xL3EvsS_xYDFgcWCxYPFhMWFxYbFh8WIxYnFisWLxYzFjcWOxY_FkMWRxZLFk8WUxZXFlsWXxZjFmcWaxZvFnMWdxZ7Fn8WgxaHFosWjxaTFpcWmxafFqMWpxarFq8Wsxa3FrsWvxbDFscWyxbPFtMW1xbbFt8W4xbnFusW7xbzFvcW-xb_GgMaBxoLGg8aExoXGhsaHxojGicaKxovGjMaNxo7Gj8aQxpHGksaTxpTGlcaWxpfGmMaZxprGm8acxp3GnsafxqDGocaixqPGpMalxqbGp8aoxqnGqsarxqzGrcauxq_GsMaxxrLGs8a0xrXGtsa3xrjGuca6xrvGvMa9xr7Gv8eAx4HHgseDx4THhceGx4fHiMeJx4rHi8eMx43HjsePx5DHkceSx5PHlMeVx5bHl8eYx5nHmsebx5zHnceex5_HoMehx6LHo8ekx6XHpsenx6jHqceqx6vHrMetx67Hr8ewx7HHssezx7THtce2x7fHuMe5x7rHu8e8x73Hvse_yIDIgciCyIPIhMiFyIbIh8iIyInIisiLyIzIjciOyI_IkMiRyJLIk8iUyJXIlsiXyJjImciayJvInMidyJ7In8igyKHIosijyKTIpcimyKfIqMipyKrIq8isyK3IrsivyLDIsciyyLPItMi1yLbIt8i4yLnIusi7yLzIvci-yL_JgMmByYLJg8mEyYXJhsmHyYjJicmKyYvJjMmNyY7Jj8mQyZHJksmTyZTJlcmWyZfJmMmZyZrJm8mcyZ3JnsmfyaDJocmiyaPJpMmlyabJp8moyanJqsmryazJrcmuya_JsMmxybLJs8m0ybXJtsm3ybjJucm6ybvJvMm9yb7Jv8qAyoHKgsqDyoTKhcqGyofKiMqJyorKi8qMyo3KjsqPypDKkcqSypPKlMqVypbKl8qYypnKmsqbypzKncqeyp_KoMqhyqLKo8qkyqXKpsqnyqjKqcqqyqvKrMqtyq7Kr8qwyrHKssqzyrTKtcq2yrfKuMq5yrrKu8q8yr3Kvsq_y4DLgcuCy4PLhMuFy4bLh8uIy4nLisuLy4zLjcuOy4_LkMuRy5LLk8uUy5XLlsuXy5jLmcuay5vLnMudy57Ln8ugy6HLosujy6TLpcumy6fLqMupy6rLq8usy63Lrsuvy7DLscuyy7PLtMu1y7bLt8u4y7nLusu7y7zLvcu-y7_MgMyBzILMg8yEzIXMhsyHzIjMicyKzIvMjMyNzI7Mj8yQzJHMksyTzJTMlcyWzJfMmMyZzJrMm8yczJ3MnsyfzKDMocyizKPMpMylzKbMp8yozKnMqsyrzKzMrcyuzK_MsMyxzLLMs8y0zLXMtsy3zLjMucy6zLvMvMy9zL7Mv82AzYHNgs2DzYTNhc2GzYfNiM2JzYrNi82MzY3Njs2PzZDNkc2SzZPNlM2VzZbNl82YzZnNms2bzZzNnc2ezZ_NoM2hzaLNo82kzaXNps2nzajNqc2qzavNrM2tza7Nr82wzbHNss2zzbTNtc22zbfNuM25zbrNu828zb3Nvs2_zoDOgc6CzoPOhM6FzobOh86IzonOis6LzozOjc6Ozo_OkM6RzpLOk86UzpXOls6XzpjOmc6azpvOnM6dzp7On86gzqHOos6jzqTOpc6mzqfOqM6pzqrOq86szq3Ors6vzrDOsc6yzrPOtM61zrbOt864zrnOus67zrzOvc6-zr_PgM-Bz4LPg8-Ez4XPhs-Hz4jPic-Kz4vPjM-Nz47Pj8-Qz5HPks-Tz5TPlc-Wz5fPmM-Zz5rPm8-cz53Pns-fz6DPoc-iz6PPpM-lz6bPpw',
    ],
    ['龙', '6b6Z', '6b6Z'],
    ['🐱', '8J+QsQ==', '8J-QsQ'],
  ]

  beforeEach(() => {
    jest.resetModules()
  })

  for (const [name, prepare] of [
    ['在 NodeJS 环境中', () => 0],
    [
      '不在 NodeJS 环境中但有 atob, btoa',
      () => {
        const bufferFrom = Buffer.from
        beforeAll(() => {
          Object.defineProperty(Buffer, 'from', {
            value: null,
          })
        })
        afterAll(() => {
          Object.defineProperty(Buffer, 'from', {
            value: bufferFrom,
          })
        })
      },
    ],
    [
      '不在 NodeJS 环境中也没有 atob, btoa',
      () => {
        const bufferFrom = Buffer.from
        const globalWindow = { ...global.window }
        beforeAll(() => {
          Object.defineProperty(Buffer, 'from', {
            value: null,
          })
          jest.spyOn(global, 'window', 'get').mockImplementation(
            () =>
              ({
                ...globalWindow,
                atob: undefined,
                btoa: undefined,
              } as any),
          )
        })
        afterAll(() => {
          Object.defineProperty(Buffer, 'from', {
            value: bufferFrom,
          })
          jest.restoreAllMocks()
        })
      },
    ],
  ] as const) {
    describe(name, () => {
      prepare()

      test('编码正常', async () => {
        const { base64Encode } = await import('./base64')
        data.forEach(([str, encodedStr]) => {
          expect(base64Encode(str)).toBe(encodedStr)
        })
      })

      test('解码正常', async () => {
        const { base64Decode } = await import('./base64')
        data.forEach(([str, encodedStr]) => {
          expect(base64Decode(encodedStr)).toBe(str)
        })
      })

      test('URL 编码正常', async () => {
        const { base64UrlEncode } = await import('./base64')
        data.forEach(([str, , encodedUrlStr]) => {
          expect(base64UrlEncode(str)).toBe(encodedUrlStr)
        })
      })

      test('URL 解码正常', async () => {
        const { base64UrlDecode } = await import('./base64')
        data.forEach(([str, , encodedUrlStr]) => {
          expect(base64UrlDecode(encodedUrlStr)).toBe(str)
        })
      })
    })
  }
})
