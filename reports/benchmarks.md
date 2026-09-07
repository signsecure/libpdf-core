# Benchmark Report

> Generated on 2026-09-07 at 12:02:19 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.2

---

## Contents

- [Comparison](#comparison)
- [Copying](#copying)
- [Drawing](#drawing)
- [Forms](#forms)
- [Loading](#loading)
- [Saving](#saving)
- [Splitting](#splitting)

## Comparison

### Load PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    53.6 |  18.66ms |  20.42ms | ±1.71% |      27 |
| pdf-lib         |     4.4 | 227.24ms | 241.18ms | ±1.84% |      10 |
| @cantoo/pdf-lib |     4.4 | 228.70ms | 264.85ms | ±4.09% |      10 |

- **libpdf** is 12.18x faster than pdf-lib
- **libpdf** is 12.26x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   15.8K |  63us |  146us | ±1.71% |   7,882 |
| pdf-lib         |    3.0K | 337us | 1.42ms | ±2.71% |   1,484 |
| @cantoo/pdf-lib |    2.7K | 366us | 1.56ms | ±2.73% |   1,367 |

- **libpdf** is 5.31x faster than pdf-lib
- **libpdf** is 5.77x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.1K | 123us |  202us | ±1.17% |   4,067 |
| @cantoo/pdf-lib |    2.4K | 414us | 2.34ms | ±3.73% |   1,209 |
| pdf-lib         |    2.3K | 437us | 1.92ms | ±3.33% |   1,147 |

- **libpdf** is 3.37x faster than @cantoo/pdf-lib
- **libpdf** is 3.56x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.8K |  362us | 1.11ms | ±1.83% |   1,382 |
| pdf-lib         |   703.1 | 1.42ms | 6.21ms | ±8.34% |     352 |
| @cantoo/pdf-lib |   594.9 | 1.68ms | 4.40ms | ±5.45% |     298 |

- **libpdf** is 3.93x faster than pdf-lib
- **libpdf** is 4.64x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    50.8 |  19.68ms |  26.83ms | ±4.18% |      26 |
| pdf-lib         |     3.1 | 323.48ms | 331.73ms | ±0.88% |      10 |
| @cantoo/pdf-lib |     1.7 | 591.29ms | 626.66ms | ±3.08% |      10 |

- **libpdf** is 16.43x faster than pdf-lib
- **libpdf** is 30.04x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.1 | 318.93ms | 328.17ms | ±1.02% |      10 |
| libpdf          |     2.9 | 345.46ms | 360.47ms | ±1.56% |      10 |
| @cantoo/pdf-lib |     1.7 | 581.38ms | 604.67ms | ±2.68% |      10 |

- **pdf-lib** is 1.08x faster than libpdf
- **pdf-lib** is 1.82x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   274.6 | 3.64ms |  4.82ms | ±1.25% |     138 |
| pdf-lib         |   110.9 | 9.02ms | 11.65ms | ±2.04% |      56 |
| @cantoo/pdf-lib |   105.2 | 9.51ms | 11.49ms | ±2.01% |      53 |

- **libpdf** is 2.48x faster than pdf-lib
- **libpdf** is 2.61x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    24.7 | 40.49ms | 44.56ms | ±2.41% |      13 |
| pdf-lib         |    13.7 | 73.11ms | 77.04ms | ±3.86% |       7 |
| @cantoo/pdf-lib |    12.8 | 78.36ms | 83.85ms | ±4.19% |       7 |

- **libpdf** is 1.81x faster than pdf-lib
- **libpdf** is 1.94x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 751.36ms | 751.36ms | ±0.00% |       1 |
| pdf-lib         |   0.749 |    1.33s |    1.33s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.697 |    1.43s |    1.43s | ±0.00% |       1 |

- **libpdf** is 1.78x faster than pdf-lib
- **libpdf** is 1.91x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   217.8 |  4.59ms |  5.31ms | ±0.97% |     109 |
| pdf-lib         |    86.3 | 11.59ms | 13.15ms | ±1.52% |      44 |
| @cantoo/pdf-lib |    76.8 | 13.02ms | 14.16ms | ±1.47% |      39 |

- **libpdf** is 2.52x faster than pdf-lib
- **libpdf** is 2.84x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    65.0 | 15.39ms | 17.72ms | ±1.66% |      33 |
| pdf-lib         |    18.8 | 53.31ms | 55.77ms | ±1.37% |      10 |
| @cantoo/pdf-lib |    15.6 | 63.91ms | 65.21ms | ±1.12% |       8 |

- **libpdf** is 3.46x faster than pdf-lib
- **libpdf** is 4.15x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    47.2 | 21.18ms | 26.51ms | ±3.58% |      24 |
| pdf-lib         |    35.9 | 27.89ms | 36.68ms | ±4.49% |      18 |
| @cantoo/pdf-lib |    35.8 | 27.95ms | 38.36ms | ±5.05% |      18 |

- **libpdf** is 1.32x faster than pdf-lib
- **libpdf** is 1.32x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    56.3 | 17.78ms | 21.76ms | ±3.12% |      29 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    30.4 | 32.91ms | 47.28ms | ±6.82% |      16 |

- **libpdf** is 1.85x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   880.6 | 1.14ms |  2.75ms | ±3.03% |     441 |
| copy 10 pages from 100-page PDF |   212.3 | 4.71ms |  5.29ms | ±0.96% |     107 |
| copy all 100 pages              |   120.0 | 8.33ms | 10.59ms | ±1.63% |      60 |

- **copy 1 page** is 4.15x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.34x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |   994.2 | 1.01ms | 1.41ms | ±0.74% |     498 |
| duplicate page 0                          |   983.1 | 1.02ms | 1.46ms | ±0.89% |     492 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   635.7 |  1.57ms |  2.06ms | ±1.05% |     318 |
| merge 10 small PDFs     |   119.8 |  8.35ms | 14.05ms | ±2.92% |      60 |
| merge 2 x 100-page PDFs |    66.3 | 15.08ms | 17.39ms | ±1.44% |      34 |

- **merge 2 small PDFs** is 5.31x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.59x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  596us | 1.24ms | ±1.37% |     840 |
| draw 100 rectangles                 |    1.5K |  665us | 1.60ms | ±2.56% |     752 |
| draw 100 circles                    |    1.0K |  965us | 1.88ms | ±1.87% |     519 |
| create 10 pages with mixed content  |   652.6 | 1.53ms | 2.61ms | ±2.08% |     327 |
| draw 100 text lines (standard font) |   602.5 | 1.66ms | 2.50ms | ±1.42% |     302 |

- **draw 100 lines** is 1.12x faster than draw 100 rectangles
- **draw 100 lines** is 1.62x faster than draw 100 circles
- **draw 100 lines** is 2.57x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.79x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   343.5 |  2.91ms |  5.25ms | ±2.18% |     172 |
| get form fields   |   290.4 |  3.44ms |  6.82ms | ±4.80% |     146 |
| flatten form      |   119.5 |  8.37ms | 11.02ms | ±1.58% |      60 |
| fill text fields  |    78.8 | 12.68ms | 17.38ms | ±4.46% |      40 |

- **read field values** is 1.18x faster than get form fields
- **read field values** is 2.87x faster than flatten form
- **read field values** is 4.36x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.0K |    67us |   197us | ±1.65% |   7,503 |
| load medium PDF (19KB) |   10.9K |    92us |   126us | ±0.62% |   5,459 |
| load form PDF (116KB)  |   749.8 |  1.33ms |  2.49ms | ±1.90% |     375 |
| load heavy PDF (2.0MB) |    53.3 | 18.76ms | 27.37ms | ±4.66% |      27 |

- **load small PDF (888B)** is 1.37x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.01x faster than load form PDF (116KB)
- **load small PDF (888B)** is 281.49x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    9.0K |   111us |   357us | ±1.25% |   4,522 |
| incremental save (19KB)            |    5.8K |   172us |   359us | ±1.14% |   2,909 |
| save with modifications (19KB)     |    1.2K |   836us |  1.51ms | ±1.32% |     598 |
| save heavy PDF (2.0MB)             |    52.9 | 18.91ms | 20.32ms | ±1.72% |      27 |
| incremental save heavy PDF (2.0MB) |    49.6 | 20.17ms | 26.40ms | ±3.96% |      25 |

- **save unmodified (19KB)** is 1.55x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.56x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 170.96x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 182.36x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   870.6 |  1.15ms |  2.84ms | ±3.85% |     436 |
| extractPages (1 page from 100-page PDF)  |   282.6 |  3.54ms |  4.72ms | ±1.36% |     142 |
| extractPages (1 page from 2000-page PDF) |    17.0 | 58.73ms | 67.70ms | ±5.20% |      10 |

- **extractPages (1 page from small PDF)** is 3.08x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 51.13x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    23.6 |  42.36ms |  46.17ms | ±3.10% |      12 |
| split 2000-page PDF (0.9MB) |     1.3 | 749.66ms | 749.66ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.70x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.3 | 57.85ms | 58.79ms | ±0.93% |       9 |
| extract first 100 pages from 2000-page PDF             |    15.4 | 64.93ms | 73.97ms | ±4.96% |       8 |
| extract every 10th page from 2000-page PDF (200 pages) |    14.7 | 68.14ms | 71.54ms | ±2.05% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.12x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.18x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
