import BoardMember from '@/components/BoardMember/BoardMember';
import getStrapiData from '@/lib/get-strapi-data';
import { SupportedLanguage } from '@/models/locale';
import { ApiBoardBoard } from '@/types/contentTypes';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function OldBoard({
  params,
}: {
  params: { slug: string; lang: SupportedLanguage };
}) {
  const year = parseInt(params.slug, 10);

  if (isNaN(year)) {
    redirect(`/${params.lang}/404`);
  }

  const boardData = await getStrapiData<ApiBoardBoard[]>(
    'fi',
    '/api/boards?populate[boardMembers][populate][boardRoles][populate]=localizations&populate[boardMembers][populate]=image',
  );

  const boardGroupedByYear = groupByYear(boardData.data);
  const board = boardGroupedByYear[params.slug];

  if (!board) {
    redirect(`/${params.lang}/404`);
  }

  const boardSortedByYear = Object.keys(boardGroupedByYear).sort(
    (a, b) => Number(b) - Number(a),
  );
  const latestBoard = boardGroupedByYear[boardSortedByYear[0]];
  const otherBoards = boardSortedByYear.filter(
    (year) => parseInt(year, 10) !== board.attributes.year,
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-14 text-5xl font-extrabold max-md:text-4xl">Board</h1>
        {!!otherBoards.length && (
          <div className="dropdown">
            <div className="btn m-1" role="button" tabIndex={0}>
              Muut hallitukset
            </div>
            <ul
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
              tabIndex={0}
            >
              {otherBoards.map((year) => (
                <li key={year}>
                  <Link
                    href={`/${params.lang}/organization/board/${year === latestBoard.attributes.year.toString() ? '' : year}`}
                  >
                    {year}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-12 lg:grid-cols-3">
        {board.attributes.boardMembers.data.map((member: any) => (
          <BoardMember key={member.attributes.createdAt} member={member} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const boardData = await getStrapiData<ApiBoardBoard[]>(
    'fi',
    '/api/boards?populate[boardMembers][populate][boardRoles][populate]=localizations&populate[boardMembers][populate]=image',
  );

  const boardGroupedByYear = groupByYear(boardData.data);

  return Object.keys(boardGroupedByYear).map((year) => ({
    params: { slug: year },
  }));
}

function groupByYear(data: ApiBoardBoard[]) {
  const groupedData = data.reduce(
    (acc, item) => {
      const year = item.attributes.year;
      acc[year] = item;
      return acc;
    },
    {} as Record<string, ApiBoardBoard>,
  );

  return groupedData;
}
