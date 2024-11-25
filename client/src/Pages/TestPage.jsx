import { Box, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

function TestPage() {
  const [documents, setDocuments] = useState([]);
  const [url, seturl] = useState();

  const onFileChange = async(event) => {
    const file = event.target.files[0];
    if (file) {
     const u= await URL.createObjectURL(file);
     seturl(u);
     console.log("hellow...",u);
      const document = {
        uri:url, // URL to the local object
        fileName: file.name // Optional file name
      };
      setDocuments([document]);
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="xl" mb={5}>Upload and View PDF</Text>
      <Input type="file" accept="application/pdf" onChange={onFileChange} mb={5} />
      {documents.length > 0 && (
        <DocViewer
          documents={documents}
          pluginRenderers={DocViewerRenderers}
        />
      )}
    </Box>
  );
}

export default TestPage;
