import { useEffect, useState } from 'react';
import { Box, Button, Image, Input, Text } from '@chakra-ui/react';
import { IoSend } from 'react-icons/io5';
import { FaPlus } from 'react-icons/fa';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";


const FilePreview = ({ sendfile, closer, file }) => {
  console.log(file);
  const [files, setFiles] = useState([{ file: file, temporaryUrl: URL.createObjectURL(file) }]);
  const [disurl, setDisurl] = useState(null);

  useEffect(() => {
    setDisurl(URL.createObjectURL(file));
  }, [file]);

  const handleFileInput = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const newFiles = selectedFiles.map((item) => ({
      file: item,
      temporaryUrl: URL.createObjectURL(item),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const send = () => {
    files.forEach((item) => {
      sendfile(item.file);
    });
  };

  const docs = [
    { uri: disurl }, // Remote file
  ];

  return (
    <div className='flex flex-col'>
      {file.type.startsWith('image') ? (
        <Box className='h-fit flex justify-center'>
          <Image src={disurl} width={"400px"} height={"400px"} />
        </Box>
      ) : null}

      <div className='flex overflow-auto no-scrollbar h-full gap-6 w-full mt-3'>
        {files.length && file.type.startsWith('image') ? files.map((item, index) => (
          <Image
            key={index}
            src={item.temporaryUrl}
            width={'50px'}
            height={'50px'}
            onClick={() => setDisurl(item.temporaryUrl)}
          />
        )) : null}
      </div>

     <Box className='flex-grow' maxH='450px' h={'450px'} overflow='auto'>
     {(file.type.endsWith('/pdf') || file.type.endsWith('/plain') || file.type.endsWith('.sheet') || file.type.endsWith('.xls') || file.type.endsWith('.document') || file.type.endsWith('.text') || file.type.endsWith('.odt')) ? (
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
      ) :null}
     </Box>

     <div className='flex overflow-auto no-scrollbar h-full gap-6 w-full mt-3'>
            { file.type.startsWith('image')&&file.type.startsWith('video')?null:
              files.map((item,index)=>
                (
                      <Button key={index} onClick={()=>setDisurl(item.temporaryUrl)}>{item.file.name}</Button>
                ))
            }
    </div>


      <div className='bg-white flex items-center justify-center mt-3 h-16'>
        <div className='w-8/12'>
          <Input
            type="text"
            placeholder="Type a message"
            border={'none'}
            fontSize={'larger'}
            bg={'white'}
            _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
          />
        </div>
        <Input
          display={'none'}
          type="file"
          multiple
          id="imageinput"
          accept="image/*"
          onChange={handleFileInput}
        />

        <div className='flex gap-10 overflow-auto no-scrollbar'>
          {file.type.startsWith('image')&&file.type.startsWith('video') ? (
            <div>
              <label htmlFor="imageinput">
                <FaPlus size={'20px'} />
              </label>
            </div>
          ) : null}
          <Input
          display={'none'}
          type="file"
          multiple
          id="fileinput"
          accept=".pdf,.txt,.xlsx,.xls,.doc,.docx,.odt"
          onChange={handleFileInput}
        />

        <div className='flex gap-10'>
          {file.type.startsWith('image') ? null:
            <div>
              <label htmlFor="fileinput">
                <FaPlus size={'20px'} />
              </label>
            </div>
          }
          </div>
          <IoSend onClick={send} />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
