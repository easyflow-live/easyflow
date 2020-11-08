import { ReactChild, ReactElement } from 'react';

enum LogTypes {
  feature = 'feature',
  improvements = 'improvements',
  bugfixes = 'bugfixes',
}

export default () => (
  <main className='w-full relative mx-auto px-6 py-16 max-w-4xl'>
    <div className='text-white antialiased'>
      <h1 className='text-4xl mb-4 font-bold'>Changelog</h1>

      <div className='mb-6'>
        <p className='mb-2'>
          Below is an ordered list of changes that we have made to{' '}
          <a
            href='https://easyflow.live'
            target='_blank'
            rel='noopener noreferrer'
            className='text-teal-500 hover:underline hover:text-pink-500'
          >
            EasyFlow
          </a>
          . Changes include but are not limited to: new features, feature
          improvements, bug fixes, other usability updates. Some changes may be
          omitted, such as changes that do not affect the user-facing
          experience.
        </p>
        <p className='mb-2'>
          The purpose of this changelog is to publicly document the updates we
          are continuously making to improve{' '}
          <a
            href='https://easyflow.live'
            target='_blank'
            rel='noopener noreferrer'
            className='text-teal-500 hover:underline hover:text-pink-500'
          >
            EasyFlow
          </a>
          . We hope this is useful to our users to know that the product is
          being actively worked on.
        </p>
      </div>

      <div className='mb-6'>
        <h3 className='font-bold my-3'>
          ✨ Have a feature request, a bug report, a suggestion or an
          interesting use case? We&apos;d love to hear it! Let us know at{' '}
          <a
            className='text-teal-500 hover:underline hover:text-pink-500'
            href='mailto:contact@easyflow.live'
          >
            contact[at]easyflow[dot]live
          </a>
          ! ✨
        </h3>
      </div>

      {/* <div className='shadow-lg rounded bg-gray-750 p-5 mb-6'>
        <div className='border-b-2 border-gray-800 pb-4 mb-5 font-bold'>
          🚧 Currently in Progress
        </div>
        <div>
          <p className='mb-2'>
            These are the highest impact features that we are currently working
            on:
          </p>
          <ol className='list-decimal'>
            <li className='ml-8 mb-1'>
              Pie charts to show current month spending
            </li>
            <li className='ml-8 mb-1'>
              Unify transaction experience across EasyFlow so you can edit
              transactions the same way wherever you are
            </li>
            <li className='ml-8 mb-1'>Keyboard shortcuts</li>
            <li className='ml-8 mb-1'>A knowledge base!</li>
          </ol>
        </div>
      </div> */}

      <h2 className='text-2xl mb-6 font-bold'>Latest Published Changes</h2>

      <LogCard>
        <LogDate>Sunday, November 8, 2020</LogDate>

        <LogList type={LogTypes.improvements}>
          {[
            'Add an UI library, to reduce bugs and increase development process.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>

        <LogList type={LogTypes.bugfixes}>
          {['Fix toast style, adding dark theme.'].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Wednesday, July 15, 2020</LogDate>

        <LogList type={LogTypes.feature}>
          {[
            'Added option to leave the board instead of archive it, to members that not own the board.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Tuesday, July 14, 2020</LogDate>

        <LogList type={LogTypes.improvements}>
          {['Improve login and pages redirect. Both are faster.'].map(
            (item, i) => (
              <LogListItem key={i}>{item}</LogListItem>
            )
          )}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Tuesday, July 7, 2020</LogDate>

        <LogList type={LogTypes.feature}>
          {['Email invitation when add a new member to the board team.'].map(
            (item, i) => (
              <LogListItem key={i}>{item}</LogListItem>
            )
          )}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Thursday, June 11, 2020</LogDate>

        <LogList type={LogTypes.feature}>
          {['The new card modal opens on full screen.'].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Thursday, June 9, 2020</LogDate>

        <LogList type={LogTypes.feature}>
          {[
            'New card modal, new design and new usability, full screen modal.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Monday, March 16, 2020</LogDate>

        <LogList type={LogTypes.feature}>
          {[
            'Added an alternative URL to access a board. You can use www.easyflow.live/b/UID now. The old URL will continue to work as before.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
        <LogList type={LogTypes.bugfixes}>
          {[
            'Fixed issues with spacebar and SHIFT+ENTER shortcut when editing a card.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Sunday, March 8, 2020</LogDate>

        <LogList type={LogTypes.feature}>
          {[
            'Added undo toast when a Card and a Column is removed.',
            'A board is now archived instead of removed, so then you can recover later.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Tuesday, February 20, 2020</LogDate>

        <LogList type={LogTypes.improvements}>
          {[
            'Improve card modal usability on mobile.',
            'Migrate Markdown lib: from marked to react-markdown.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Monday, February 17, 2020</LogDate>

        <LogList type={LogTypes.improvements}>
          {[
            'Added style to scrollbar on Firefox.',
            'Some inputs and buttons alignments.',
            'Redesigned card badges.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Tuesday, December 24, 2019</LogDate>

        <LogList type={LogTypes.bugfixes}>
          {[
            'Fixed the right activity assignee, when a card is moved between columns.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Monday, October 21, 2019</LogDate>
        <LogList type={LogTypes.feature}>
          {['You can now set a card as "Done" when it has a due date.'].map(
            (item, i) => (
              <LogListItem key={i}>{item}</LogListItem>
            )
          )}
        </LogList>

        <LogList type={LogTypes.improvements}>
          {['Card menu now has the same style as the whole app.'].map(
            (item, i) => (
              <LogListItem key={i}>{item}</LogListItem>
            )
          )}
        </LogList>

        <LogList type={LogTypes.bugfixes}>
          {['Fixed the options to remove a given due date to a card.'].map(
            (item, i) => (
              <LogListItem key={i}>{item}</LogListItem>
            )
          )}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Saturday, October 19, 2019</LogDate>

        <LogList type={LogTypes.improvements}>
          {['Improved inputs contrast, making them lighter.'].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>

        <LogList type={LogTypes.bugfixes}>
          {[
            'Fixed calendar due date with wrong format.',
            'Fixed board title showing the url instead of the board name.',
          ].map((item, i) => (
            <LogListItem key={i}>{item}</LogListItem>
          ))}
        </LogList>
      </LogCard>

      <LogCard>
        <LogDate>Monday, October 14, 2019</LogDate>

        <LogList type={LogTypes.feature}>
          {['Added a right menu listing all board users activities.'].map(
            (item, i) => (
              <LogListItem key={i}>{item}</LogListItem>
            )
          )}
        </LogList>
      </LogCard>

      {/* <div className='shadow-lg rounded bg-gray-750 p-5'>
        <div className='border-b-2 border-gray-800 pb-4 mb-5 font-bold'>
          Thursday, October 17, 2019
        </div>
        <div>
          <p className='mb-2'>
            This week, I spent time on some behind-the-scenes improvements to
            automate some tasks that I've been doing manually. This should free
            up more time for me to continue working on features and user-facing
            improvements! Thank you everyone for your feedback and please keep
            them coming!
          </p>
          <h3 className='font-bold my-3'>⭐ Improvements</h3>
          <ul className='list-disc'>
            <li className='ml-8 mb-1'>
              You can now remove your billing information. -
              <i>Thanks Elias and Naseem!</i>
            </li>
            <li className='ml-8 mb-1'>
              Categories, tags and account names are no longer auto-capitalized.
              - <i>Thanks Leonardo!</i>
            </li>
            <li className='ml-8 mb-1'>
              The modal for adding a new account no longer closes if you are
              making progress and click outside of the editing area. -
              <i>Thanks Elias!</i>
            </li>
            <li className='ml-8 mb-1'>
              When adding tags, the dropdown no longer covers the 'Done' button.
              - <i>Thanks Leonardo!</i>
            </li>
          </ul>
          <h3 className='font-bold my-3'>🔧 Bug Fixes</h3>
          <ul className='list-disc'>
            <li className='ml-8 mb-1'>
              Fixed a bug where you can't delete a transaction you just added. -
              <i>Thanks Elias!</i>
            </li>
          </ul>
        </div>
      </div>
      */}

      <p className='mt-12 text-gray-600 text-center font-mono text-xs'>
        end of changelog.
      </p>
    </div>
  </main>
);

const LogCard = ({ children }: { children: ReactElement[] }) => (
  <div className='shadow-lg rounded bg-gray-750 p-5 mb-4'>{children}</div>
);

const LogDate = ({ children }: { children: ReactChild }) => (
  <div className='border-b-2 border-gray-800 pb-4 mb-5 font-bold'>
    {children}
  </div>
);

const LogListType = ({ type }: { type: LogTypes }) => {
  switch (type) {
    case LogTypes.feature:
      return <h3 className='font-bold my-3'>🎁 New Features</h3>;

    case LogTypes.improvements:
      return <h3 className='font-bold my-3'>⭐ Improvements</h3>;

    case LogTypes.bugfixes:
      return <h3 className='font-bold my-3'>🔧 Bug Fixes</h3>;

    default:
      return null;
  }
};

const LogList = ({
  children,
  type,
}: {
  children: ReactElement[];
  type: LogTypes;
}) => (
  <div>
    <LogListType type={type} />
    <ul className='list-disc'>{children}</ul>
  </div>
);

const LogListItem = ({ children }: { children: ReactChild }) => (
  <li className='ml-8 mb-1'>{children}</li>
);
