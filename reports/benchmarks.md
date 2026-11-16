# Benchmark Report

> Generated on 2026-11-16 at 15:17:08 UTC
>
> System: linux | AMD EPYC 9V74 80-Core Processor (4 cores) | 16GB RAM | Bun 1.4.4

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
| libpdf          |    66.1 |  15.14ms |  21.72ms | ±5.17% |      34 |
| pdf-lib         |     5.1 | 194.45ms | 197.61ms | ±0.84% |      10 |
| @cantoo/pdf-lib |     4.9 | 202.59ms | 216.00ms | ±2.68% |      10 |

- **libpdf** is 12.85x faster than pdf-lib
- **libpdf** is 13.38x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   14.7K |  68us |  340us | ±8.77% |   7,335 |
| @cantoo/pdf-lib |    3.0K | 336us | 1.76ms | ±6.28% |   1,490 |
| pdf-lib         |    2.9K | 345us | 1.81ms | ±6.90% |   1,449 |

- **libpdf** is 4.93x faster than @cantoo/pdf-lib
- **libpdf** is 5.06x faster than pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   12.3K |  82us |  149us | ±1.00% |   6,134 |
| @cantoo/pdf-lib |    2.5K | 403us | 1.84ms | ±5.56% |   1,241 |
| pdf-lib         |    2.4K | 410us | 2.56ms | ±6.42% |   1,221 |

- **libpdf** is 4.95x faster than @cantoo/pdf-lib
- **libpdf** is 5.02x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    4.0K |  249us |  502us | ±0.89% |   2,009 |
| pdf-lib         |   983.1 | 1.02ms | 5.45ms | ±6.03% |     492 |
| @cantoo/pdf-lib |   859.9 | 1.16ms | 8.91ms | ±9.24% |     430 |

- **libpdf** is 4.09x faster than pdf-lib
- **libpdf** is 4.67x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    69.0 |  14.50ms |  18.48ms | ±2.54% |      35 |
| pdf-lib         |     3.5 | 282.22ms | 296.28ms | ±3.11% |      10 |
| @cantoo/pdf-lib |     1.9 | 531.57ms | 539.39ms | ±0.84% |      10 |

- **libpdf** is 19.47x faster than pdf-lib
- **libpdf** is 36.67x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     3.8 | 261.15ms | 275.19ms | ±1.92% |      10 |
| pdf-lib         |     3.5 | 283.66ms | 306.27ms | ±3.09% |      10 |
| @cantoo/pdf-lib |     1.9 | 527.91ms | 533.18ms | ±0.55% |      10 |

- **libpdf** is 1.09x faster than pdf-lib
- **libpdf** is 2.02x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   381.2 | 2.62ms |  4.68ms | ±2.09% |     191 |
| pdf-lib         |   129.1 | 7.74ms | 11.13ms | ±2.30% |      65 |
| @cantoo/pdf-lib |   123.7 | 8.09ms | 15.25ms | ±4.34% |      62 |

- **libpdf** is 2.95x faster than pdf-lib
- **libpdf** is 3.08x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |     RME | Samples |
| :-------------- | ------: | ------: | ------: | ------: | ------: |
| libpdf          |    37.0 | 27.03ms | 28.08ms |  ±0.93% |      19 |
| pdf-lib         |    15.5 | 64.54ms | 81.69ms | ±19.42% |       8 |
| @cantoo/pdf-lib |    14.3 | 69.71ms | 85.89ms | ±13.05% |       8 |

- **libpdf** is 2.39x faster than pdf-lib
- **libpdf** is 2.58x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.9 | 531.54ms | 531.54ms | ±0.00% |       1 |
| pdf-lib         |   0.849 |    1.18s |    1.18s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.818 |    1.22s |    1.22s | ±0.00% |       1 |

- **libpdf** is 2.22x faster than pdf-lib
- **libpdf** is 2.30x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   309.5 |  3.23ms |  4.50ms | ±1.42% |     155 |
| pdf-lib         |    96.5 | 10.37ms | 14.25ms | ±2.91% |      49 |
| @cantoo/pdf-lib |    85.3 | 11.73ms | 17.68ms | ±3.85% |      43 |

- **libpdf** is 3.21x faster than pdf-lib
- **libpdf** is 3.63x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    90.8 | 11.02ms | 15.76ms | ±2.30% |      46 |
| pdf-lib         |    20.6 | 48.57ms | 50.89ms | ±2.09% |      11 |
| @cantoo/pdf-lib |    17.2 | 58.30ms | 62.71ms | ±3.26% |       9 |

- **libpdf** is 4.41x faster than pdf-lib
- **libpdf** is 5.29x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |     RME | Samples |
| :-------------- | ------: | ------: | ------: | ------: | ------: |
| libpdf          |    61.8 | 16.18ms | 29.46ms | ±10.65% |      31 |
| pdf-lib         |    43.7 | 22.90ms | 35.16ms |  ±7.43% |      22 |
| @cantoo/pdf-lib |    41.8 | 23.90ms | 33.84ms |  ±6.03% |      21 |

- **libpdf** is 1.42x faster than pdf-lib
- **libpdf** is 1.48x faster than @cantoo/pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    88.1 | 11.35ms | 15.33ms | ±3.24% |      45 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    38.1 | 26.21ms | 34.59ms | ±5.46% |      20 |

- **libpdf** is 2.31x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |    1.4K |  709us | 1.41ms | ±1.83% |     706 |
| copy 10 pages from 100-page PDF |   305.9 | 3.27ms | 5.06ms | ±1.89% |     154 |
| copy all 100 pages              |   177.3 | 5.64ms | 6.20ms | ±0.69% |      89 |

- **copy 1 page** is 4.61x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.96x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |  Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | ----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |    1.4K | 697us | 1.31ms | ±1.00% |     718 |
| duplicate page 0                          |    1.4K | 702us | 1.04ms | ±0.69% |     713 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   932.9 |  1.07ms |  1.45ms | ±0.67% |     467 |
| merge 10 small PDFs     |   181.9 |  5.50ms |  6.89ms | ±0.90% |      92 |
| merge 2 x 100-page PDFs |    95.0 | 10.53ms | 11.64ms | ±0.81% |      48 |

- **merge 2 small PDFs** is 5.13x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.82x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    2.4K |  410us |  753us | ±0.87% |   1,220 |
| draw 100 rectangles                 |    2.2K |  458us |  887us | ±1.36% |   1,091 |
| draw 100 circles                    |    1.6K |  624us | 1.27ms | ±1.31% |     801 |
| create 10 pages with mixed content  |   935.7 | 1.07ms | 1.79ms | ±1.16% |     468 |
| draw 100 text lines (standard font) |   829.5 | 1.21ms | 2.01ms | ±1.38% |     415 |

- **draw 100 lines** is 1.12x faster than draw 100 rectangles
- **draw 100 lines** is 1.52x faster than draw 100 circles
- **draw 100 lines** is 2.61x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.94x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |   Mean |     p99 |    RME | Samples |
| :---------------- | ------: | -----: | ------: | -----: | ------: |
| read field values |   474.7 | 2.11ms |  3.61ms | ±1.91% |     238 |
| get form fields   |   448.9 | 2.23ms |  3.59ms | ±2.11% |     225 |
| flatten form      |   170.4 | 5.87ms |  7.60ms | ±1.17% |      86 |
| fill text fields  |   117.9 | 8.49ms | 11.75ms | ±2.31% |      59 |

- **read field values** is 1.06x faster than get form fields
- **read field values** is 2.79x faster than flatten form
- **read field values** is 4.03x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   24.9K |    40us |    85us | ±0.84% |  12,464 |
| load medium PDF (19KB) |   15.7K |    64us |    82us | ±0.39% |   7,863 |
| load form PDF (116KB)  |    1.0K |   991us |  1.65ms | ±3.04% |     505 |
| load heavy PDF (2.0MB) |    68.1 | 14.69ms | 20.61ms | ±2.64% |      35 |

- **load small PDF (888B)** is 1.59x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 24.71x faster than load form PDF (116KB)
- **load small PDF (888B)** is 366.09x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |   13.9K |    72us |   145us | ±0.82% |   6,973 |
| incremental save (19KB)            |    8.9K |   113us |   234us | ±3.48% |   4,428 |
| save with modifications (19KB)     |    1.8K |   568us |  1.04ms | ±1.08% |     881 |
| save heavy PDF (2.0MB)             |    68.9 | 14.52ms | 20.10ms | ±2.72% |      35 |
| incremental save heavy PDF (2.0MB) |    64.5 | 15.49ms | 19.40ms | ±3.46% |      33 |

- **save unmodified (19KB)** is 1.57x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.92x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 202.42x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 216.05x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |    1.4K |   732us |  1.55ms | ±2.01% |     684 |
| extractPages (1 page from 100-page PDF)  |   407.0 |  2.46ms |  3.46ms | ±1.35% |     204 |
| extractPages (1 page from 2000-page PDF) |    24.0 | 41.74ms | 58.95ms | ±9.31% |      12 |

- **extractPages (1 page from small PDF)** is 3.36x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 57.04x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |     RME | Samples |
| :-------------------------- | ------: | -------: | -------: | ------: | ------: |
| split 100-page PDF (0.1MB)  |    35.6 |  28.11ms |  59.81ms | ±14.07% |      18 |
| split 2000-page PDF (0.9MB) |     2.0 | 510.90ms | 510.90ms |  ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.17x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    25.0 | 39.93ms | 45.30ms | ±2.92% |      13 |
| extract first 100 pages from 2000-page PDF             |    23.8 | 41.99ms | 43.33ms | ±1.06% |      12 |
| extract every 10th page from 2000-page PDF (200 pages) |    21.4 | 46.79ms | 54.55ms | ±3.88% |      11 |

- **extract first 10 pages from 2000-page PDF** is 1.05x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.17x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
