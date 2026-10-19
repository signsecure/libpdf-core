# Benchmark Report

> Generated on 2026-10-19 at 12:39:20 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.3

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
| libpdf          |    50.6 |  19.77ms |  24.09ms | ±2.66% |      26 |
| pdf-lib         |     4.4 | 229.02ms | 233.29ms | ±0.87% |      10 |
| @cantoo/pdf-lib |     4.3 | 231.78ms | 237.76ms | ±1.23% |      10 |

- **libpdf** is 11.58x faster than pdf-lib
- **libpdf** is 11.72x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   13.0K |  77us |  177us | ±2.62% |   6,487 |
| pdf-lib         |    2.8K | 361us | 1.61ms | ±3.14% |   1,387 |
| @cantoo/pdf-lib |    2.4K | 411us | 2.01ms | ±4.06% |   1,217 |

- **libpdf** is 4.68x faster than pdf-lib
- **libpdf** is 5.33x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    7.6K | 132us |  273us | ±1.58% |   3,786 |
| @cantoo/pdf-lib |    2.2K | 465us | 2.73ms | ±4.94% |   1,076 |
| pdf-lib         |    2.0K | 493us | 2.33ms | ±4.28% |   1,015 |

- **libpdf** is 3.52x faster than @cantoo/pdf-lib
- **libpdf** is 3.73x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.6K |  387us | 1.10ms | ±1.98% |   1,291 |
| pdf-lib         |   682.4 | 1.47ms | 5.33ms | ±6.99% |     342 |
| @cantoo/pdf-lib |   584.8 | 1.71ms | 4.92ms | ±5.70% |     293 |

- **libpdf** is 3.78x faster than pdf-lib
- **libpdf** is 4.41x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    50.5 |  19.80ms |  26.47ms | ±3.51% |      26 |
| pdf-lib         |     3.0 | 333.53ms | 349.94ms | ±1.53% |      10 |
| @cantoo/pdf-lib |     1.7 | 601.06ms | 642.42ms | ±2.58% |      10 |

- **libpdf** is 16.84x faster than pdf-lib
- **libpdf** is 30.35x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.1 | 327.51ms | 344.26ms | ±1.49% |      10 |
| libpdf          |     2.7 | 372.74ms | 398.21ms | ±2.02% |      10 |
| @cantoo/pdf-lib |     1.7 | 593.94ms | 638.40ms | ±2.40% |      10 |

- **pdf-lib** is 1.14x faster than libpdf
- **pdf-lib** is 1.81x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   254.3 |  3.93ms |  4.83ms | ±1.16% |     128 |
| pdf-lib         |   105.8 |  9.45ms | 10.54ms | ±1.34% |      53 |
| @cantoo/pdf-lib |    95.4 | 10.48ms | 15.88ms | ±3.89% |      48 |

- **libpdf** is 2.40x faster than pdf-lib
- **libpdf** is 2.66x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    23.7 | 42.24ms | 44.01ms | ±1.69% |      12 |
| pdf-lib         |    13.0 | 77.04ms | 86.16ms | ±7.24% |       7 |
| @cantoo/pdf-lib |    12.2 | 81.77ms | 87.51ms | ±4.53% |       7 |

- **libpdf** is 1.82x faster than pdf-lib
- **libpdf** is 1.94x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 795.36ms | 795.36ms | ±0.00% |       1 |
| pdf-lib         |   0.730 |    1.37s |    1.37s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.668 |    1.50s |    1.50s | ±0.00% |       1 |

- **libpdf** is 1.72x faster than pdf-lib
- **libpdf** is 1.88x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   194.6 |  5.14ms |  6.26ms | ±1.39% |      98 |
| pdf-lib         |    79.6 | 12.56ms | 15.70ms | ±1.92% |      40 |
| @cantoo/pdf-lib |    71.2 | 14.04ms | 15.72ms | ±1.81% |      36 |

- **libpdf** is 2.44x faster than pdf-lib
- **libpdf** is 2.73x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    54.3 | 18.43ms | 19.73ms | ±1.37% |      28 |
| pdf-lib         |    17.9 | 55.81ms | 58.32ms | ±1.76% |       9 |
| @cantoo/pdf-lib |    15.0 | 66.56ms | 68.07ms | ±1.15% |       8 |

- **libpdf** is 3.03x faster than pdf-lib
- **libpdf** is 3.61x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    44.6 | 22.43ms | 25.85ms | ±2.78% |      23 |
| @cantoo/pdf-lib |    34.7 | 28.84ms | 40.65ms | ±5.52% |      18 |
| pdf-lib         |    34.2 | 29.22ms | 42.08ms | ±6.07% |      18 |

- **libpdf** is 1.29x faster than @cantoo/pdf-lib
- **libpdf** is 1.30x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    51.4 | 19.46ms | 23.20ms | ±2.92% |      26 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    29.2 | 34.22ms | 49.70ms | ±7.25% |      15 |

- **libpdf** is 1.76x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   783.2 | 1.28ms |  2.95ms | ±3.75% |     392 |
| copy 10 pages from 100-page PDF |   192.7 | 5.19ms |  9.40ms | ±2.35% |      97 |
| copy all 100 pages              |   110.7 | 9.04ms | 13.08ms | ±1.98% |      56 |

- **copy 1 page** is 4.06x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.08x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |   939.7 | 1.06ms | 1.60ms | ±0.88% |     470 |
| duplicate page 0                          |   929.3 | 1.08ms | 1.67ms | ±1.00% |     465 |

- **duplicate all pages (double the document)** is 1.01x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   590.7 |  1.69ms |  2.29ms | ±1.21% |     296 |
| merge 10 small PDFs     |   106.1 |  9.42ms | 12.80ms | ±1.72% |      54 |
| merge 2 x 100-page PDFs |    58.2 | 17.18ms | 22.97ms | ±2.54% |      30 |

- **merge 2 small PDFs** is 5.57x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 10.15x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  596us | 1.19ms | ±1.45% |     839 |
| draw 100 rectangles                 |    1.4K |  695us | 2.20ms | ±3.85% |     720 |
| draw 100 circles                    |   983.8 | 1.02ms | 1.95ms | ±1.72% |     492 |
| create 10 pages with mixed content  |   635.4 | 1.57ms | 2.87ms | ±2.42% |     318 |
| draw 100 text lines (standard font) |   590.4 | 1.69ms | 2.77ms | ±1.62% |     296 |

- **draw 100 lines** is 1.16x faster than draw 100 rectangles
- **draw 100 lines** is 1.70x faster than draw 100 circles
- **draw 100 lines** is 2.64x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.84x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   337.7 |  2.96ms |  5.54ms | ±2.17% |     169 |
| get form fields   |   287.6 |  3.48ms |  6.84ms | ±4.82% |     144 |
| flatten form      |   110.7 |  9.03ms | 12.06ms | ±2.34% |      56 |
| fill text fields  |    71.3 | 14.03ms | 18.47ms | ±3.87% |      36 |

- **read field values** is 1.17x faster than get form fields
- **read field values** is 3.05x faster than flatten form
- **read field values** is 4.74x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.9K |    63us |   183us | ±1.07% |   7,959 |
| load medium PDF (19KB) |   10.9K |    92us |   128us | ±0.67% |   5,448 |
| load form PDF (116KB)  |   743.9 |  1.34ms |  2.60ms | ±2.05% |     372 |
| load heavy PDF (2.0MB) |    53.8 | 18.59ms | 19.47ms | ±1.58% |      27 |

- **load small PDF (888B)** is 1.46x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 21.40x faster than load form PDF (116KB)
- **load small PDF (888B)** is 295.91x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.0K |   125us |   356us | ±2.57% |   3,997 |
| incremental save (19KB)            |    5.7K |   174us |   377us | ±1.19% |   2,870 |
| save with modifications (19KB)     |    1.1K |   883us |  1.68ms | ±1.84% |     567 |
| save heavy PDF (2.0MB)             |    51.8 | 19.31ms | 20.26ms | ±0.97% |      26 |
| incremental save heavy PDF (2.0MB) |    48.9 | 20.47ms | 23.01ms | ±1.90% |      25 |

- **save unmodified (19KB)** is 1.39x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.06x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 154.36x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 163.64x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   881.6 |  1.13ms |  2.24ms | ±2.65% |     441 |
| extractPages (1 page from 100-page PDF)  |   260.6 |  3.84ms |  4.56ms | ±1.08% |     131 |
| extractPages (1 page from 2000-page PDF) |    17.0 | 58.78ms | 67.29ms | ±3.72% |      10 |

- **extractPages (1 page from small PDF)** is 3.38x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 51.82x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    23.5 |  42.58ms |  47.45ms | ±2.51% |      12 |
| split 2000-page PDF (0.9MB) |     1.3 | 759.49ms | 759.49ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.84x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    16.6 | 60.26ms | 61.50ms | ±0.85% |       9 |
| extract first 100 pages from 2000-page PDF             |    15.8 | 63.39ms | 64.44ms | ±1.18% |       8 |
| extract every 10th page from 2000-page PDF (200 pages) |    13.6 | 73.78ms | 77.72ms | ±3.16% |       7 |

- **extract first 10 pages from 2000-page PDF** is 1.05x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.22x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
